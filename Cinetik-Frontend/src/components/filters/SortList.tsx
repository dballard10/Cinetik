import SortBy from "./SortBy";
import { sortBy } from "@/data/sortby";

const SortList = () => {
  return (
    <div className="flex flex-col gap-2">
      {sortBy.map((option) => (
        <SortBy
          key={option.name}
          id_asc={option.id_asc}
          id_desc={option.id_desc}
          name={option.name}
        />
      ))}
    </div>
  );
};

export default SortList;
