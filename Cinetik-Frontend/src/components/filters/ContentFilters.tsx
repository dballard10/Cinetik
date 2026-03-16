import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GenreList from "./GenreList";
import SortList from "./SortList";
import PlatformList from "./PlatformList";
import ClearFilterButton from "./ClearFilterButton";
import useMediaStore from "@/hooks/use-media-store";

const ContentFilters = ({ media_type }: { media_type: string }) => {
  const { selectedGenres, selectedPlatforms, selectedSort } = useMediaStore();
  return (
    <div className="flex flex-col pl-2 pr-2">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="genres">
          <AccordionTrigger className="text-white hover:scale-105">
            <div className="flex items-center justify-between gap-2">
              <span>Genres</span>
              {selectedGenres.names.length > 0 && (
                <ClearFilterButton filter="genres" />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <GenreList media_type={media_type} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="platforms">
          <AccordionTrigger className="text-white hover:scale-105 no-underline">
            <div className="flex items-center justify-between gap-2">
              <span>Platforms</span>
              {selectedPlatforms.platformIds.length > 0 && (
                <ClearFilterButton filter="platforms" />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <PlatformList />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sort">
          <AccordionTrigger className="text-white hover:scale-105 no-underline">
            <div className="flex items-center justify-between gap-2">
              <span>Sort By</span>
              {selectedSort.id_desc !== "" && (
                <ClearFilterButton filter="sort" />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <SortList />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ContentFilters;
