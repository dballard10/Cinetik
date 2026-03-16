import React from "react";

const Separator: React.FC = () => {
  return (
    <div className="w-full h-[2px] my-6">
      <div className="w-[90%] mx-auto h-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </div>
  );
};

export default Separator;
