import CollapseButton from "../filters/CollapseButton";
import { useEffect, useRef } from "react";
import ContentFilters from "../filters/ContentFilters";

interface AsidePanelProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const AsidePanel = ({ isCollapsed, toggleCollapse }: AsidePanelProps) => {
  const asideRef = useRef<HTMLDivElement>(null);
  // Handle click outside to collapse panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !isCollapsed &&
        asideRef.current &&
        !asideRef.current.contains(event.target as Node)
      ) {
        toggleCollapse();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCollapsed, toggleCollapse]);

  return (
    <div className={"relative"}>
      <aside
        ref={asideRef}
        className={`absolute -top-8 -left-8 m-0 h-[calc(100vh-4rem)] bg-gray-900 text-white overflow-y-auto z-30
            w-80 transition-transform ease-in-out duration-300
            ${
              isCollapsed
                ? "-translate-x-full shadow-none border-none"
                : "translate-x-0 shadow-2xl shadow-black/50 border-r border-gray-700"
            }`}
      >
        <div className="mt-2 px-3 pt-20 pb-14">
          <ContentFilters media_type="both" />
        </div>
      </aside>

      <div className="absolute top-2 -left-2 z-40 transition-all duration-300 ease-in-out">
        <CollapseButton
          toggleCollapse={toggleCollapse}
          isCollapsed={isCollapsed}
        />
      </div>
    </div>
  );
};

export default AsidePanel;
