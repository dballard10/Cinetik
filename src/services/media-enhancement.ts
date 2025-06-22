import { Media } from "@/entities/media";
import { favoritesApi, watchesApi } from "./api-client";

export class MediaEnhancementService {
  /**
   * Enhances media items with favorites status in parallel
   * @param mediaItems - Basic media items to enhance
   * @returns Promise<Media[]> - Enhanced media items with favorites status
   */
  static async enhanceWithFavorites(mediaItems: Media[]): Promise<Media[]> {
    if (!mediaItems || mediaItems.length === 0) {
      return [];
    }

    try {
      // Make all favorite checks in parallel
      const favoritePromises = mediaItems.map(async (item) => {
        const isFavorite = await favoritesApi.isFavorite(item.id);
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
   * @returns Promise<Media[]> - Enhanced media items with watched status
   */
  static async enhanceWithWatched(mediaItems: Media[]): Promise<Media[]> {
    if (!mediaItems || mediaItems.length === 0) {
      return [];
    }

    try {
      // Make all watched checks in parallel
      const watchedPromises = mediaItems.map(async (item) => {
        const isWatched = await watchesApi.isWatched(item.id);
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
   * @returns Promise<Media[]> - Enhanced media items with favorites and watched status
   */
  static async enhanceWithFavoritesAndWatched(
    mediaItems: Media[]
  ): Promise<Media[]> {
    if (!mediaItems || mediaItems.length === 0) {
      return [];
    }

    try {
      // Make all API calls in parallel for maximum performance
      const enhancementPromises = mediaItems.map(async (item) => {
        const [isFavorite, isWatched] = await Promise.all([
          favoritesApi.isFavorite(item.id),
          watchesApi.isWatched(item.id),
        ]);
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
}
