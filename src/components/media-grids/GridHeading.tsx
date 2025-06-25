import Separator from "../page-components/Separator";
import NextPageButton from "../page-components/NextPageButton";
import PrevPageButton from "../page-components/PrevPageButton";

const GridHeading = ({
  title,
  page,
  setPage,
  totalPages,
}: {
  title: string;
  page: number;
  setPage: (page: number) => void;
  totalPages?: number;
}) => {
  const isLastPage = totalPages ? page >= totalPages : false;

  return (
    <div>
      <div className="flex items-center justify-center pb-2 pt-4">
        {title !== "What your friends are watching" && (
          <div className="flex items-center px-12 py-2">
            <PrevPageButton page={page} setPage={setPage} />
          </div>
        )}
        <h1 className="text-center text-3xl font-bold tracking-tight text-white pb-2 pt-4">
          {title}
        </h1>
        {title !== "What your friends are watching" && (
          <div className="flex items-center px-12 py-2">
            <NextPageButton
              page={page}
              setPage={setPage}
              disabled={isLastPage}
            />
          </div>
        )}
      </div>
      <Separator />
    </div>
  );
};

export default GridHeading;
