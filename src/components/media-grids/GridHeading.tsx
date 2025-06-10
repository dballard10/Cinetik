import Separator from "../page-components/Separator";
import NextPageButton from "../page-components/NextPageButton";
import PrevPageButton from "../page-components/PrevPageButton";

const GridHeading = ({ title }: { title: string }) => {
  return (
    <div>
      <div className="flex items-center justify-center pb-2 pt-4">
        <div className="flex items-center px-12 py-2">
          <PrevPageButton />
        </div>
        <h1 className="text-center text-3xl font-bold tracking-tight text-white pb-2 pt-4">
          {title}
        </h1>
        <div className="flex items-center px-12 py-2">
          <NextPageButton />
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default GridHeading;
