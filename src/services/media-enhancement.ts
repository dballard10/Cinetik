import { Media } from "@/entities/media";
import { favoritesApi, watchesApi } from "./api-client";
import useMediaStore from "@/hooks/use-media-store";

export class MediaEnhancementService {
  /**
   * Enhances media items with favorites status in parallel
   * @param mediaItems - Basic media items to enhance
   * @param useLocalState - Whether to use local state instead of API (default: false)
   * @returns Promise<Media[]> - Enhanced media items with favorites status
   */
  static async enhanceWithFavorites(
    mediaItems: Media[],
    useLocalState: boolean = false
  ): Promise<Media[]> {
    if (!mediaItems || mediaItems.length === 0) {
      return [];
    }

    try {
      if (useLocalState) {
        // Use centralized state - this is synchronous and faster
        const { getFavoriteStatus } = useMediaStore.getState();
        return mediaItems.map((item) => ({
          ...item,
          isFavorite: getFavoriteStatus(item.id),
        }));
      }

      // Make all favorite checks in parallel using API
      const favoritePromises = mediaItems.map(async (item) => {
        const isFavorite = await favoritesApi.isFavorite(item.id);
        // Also sync with local state
        const { setFavoriteStatus } = useMediaStore.getState();
        setFavoriteStatus(item.id, isFavorite);
        return { ...item, isFavorite };
      });

      const results = await Promise.all(favoritePromises);
      return results;
    } catch (error) {
      console.error("Error enhancing media with favorites status:", error);
      // Return original items with default status if enhancement fails
      return mediaItems;
    }
  }

  /**
   * Enhances media items with watched status in parallel
   * @param mediaItems - Media items to enhance (should already have favorites status)
   * @param useLocalState - Whether to use local state instead of API (default: false)
   * @returns Promise<Media[]> - Enhanced media items with watched status
   */
  static async enhanceWithWatched(
    mediaItems: Media[],
    useLocalState: boolean = false
  ): Promise<Media[]> {
    if (!mediaItems || mediaItems.length === 0) {
      return [];
    }

    try {
      if (useLocalState) {
        // Use centralized state - this is synchronous and faster
        const { getWatchedStatus } = useMediaStore.getState();
        return mediaItems.map((item) => ({
          ...item,
          isWatched: getWatchedStatus(item.id),
        }));
      }

      // Make all watched checks in parallel using API
      const watchedPromises = mediaItems.map(async (item) => {
        const isWatched = await watchesApi.isWatched(item.id);
        // Also sync with local state
        const { setWatchedStatus } = useMediaStore.getState();
        setWatchedStatus(item.id, isWatched);
        return { ...item, isWatched };
      });

      const results = await Promise.all(watchedPromises);
      return results;
    } catch (error) {
      console.error("Error enhancing media with watched status:", error);
      // Return original items with default status if enhancement fails
      return mediaItems;
    }
  }

  /**
   * Enhances media items with both favorites and watched status in parallel
   * @param mediaItems - Basic media items to enhance
   * @param useLocalState - Whether to use local state instead of API (default: false)
   * @returns Promise<Media[]> - Enhanced media items with favorites and watched status
   */
  static async enhanceWithFavoritesAndWatched(
    mediaItems: Media[],
    useLocalState: boolean = false
  ): Promise<Media[]> {
    if (!mediaItems || mediaItems.length === 0) {
      return [];
    }

    try {
      if (useLocalState) {
        // Use centralized state - this is synchronous and faster
        const { getFavoriteStatus, getWatchedStatus } =
          useMediaStore.getState();
        return mediaItems.map((item) => ({
          ...item,
          isFavorite: getFavoriteStatus(item.id),
          isWatched: getWatchedStatus(item.id),
        }));
      }

      // Make all API calls in parallel for maximum performance
      const enhancementPromises = mediaItems.map(async (item) => {
        const [isFavorite, isWatched] = await Promise.all([
          favoritesApi.isFavorite(item.id),
          watchesApi.isWatched(item.id),
        ]);

        // Also sync with local state
        const { setFavoriteStatus, setWatchedStatus } =
          useMediaStore.getState();
        setFavoriteStatus(item.id, isFavorite);
        setWatchedStatus(item.id, isWatched);

        return { ...item, isFavorite, isWatched };
      });

      const results = await Promise.all(enhancementPromises);
      return results;
    } catch (error) {
      console.error(
        "Error enhancing media with favorites/watched status:",
        error
      );
      // Return original items with default status if enhancement fails
      return mediaItems;
    }
  }

  /**
   * Syncs local state with API for a batch of media items
   * This is useful for initializing the local state from server data
   * @param mediaItems - Media items to sync
   */
  static async syncWithAPI(mediaItems: Media[]): Promise<void> {
    if (!mediaItems || mediaItems.length === 0) {
      return;
    }

    try {
      const { setFavoriteStatus, setWatchedStatus } = useMediaStore.getState();

      const syncPromises = mediaItems.map(async (item) => {
        const [isFavorite, isWatched] = await Promise.all([
          favoritesApi.isFavorite(item.id),
          watchesApi.isWatched(item.id),
        ]);

        setFavoriteStatus(item.id, isFavorite);
        setWatchedStatus(item.id, isWatched);
      });

      await Promise.all(syncPromises);
    } catch (error) {
      console.error("Error syncing local state with API:", error);
    }
  }
}
