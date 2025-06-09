import Separator from "../page-components/Separator";
import NextPageButton from "../page-components/NextPageButton";
import PrevPageButton from "../page-components/PrevPageButton";

const GridHeading = ({ title }: { title: string }) => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold tracking-tight text-white pb-2 pt-4">
        {title}
      </h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center px-12">
          <PrevPageButton />
        </div>
        <Separator />
        <div className="flex items-center px-12">
          <NextPageButton />
        </div>
      </div>
    </div>
  );
};

export default GridHeading;
