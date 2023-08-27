import React, { useState } from "react";

type TabProps = {
  label: string;
  onClick: Function;
};

const Tab: React.FC<TabProps> = ({ label, onClick }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
  };

  return (
    <div className="relative">
      <button
        className={`tab ml-2 mr-2 mb-4 ${
          isActive
            ? "tab-active bg-blue-400 hover:bg-blue-600 focus:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            : ""
        }`}
        onClick={() => {
          handleClick();
          onClick();
        }}
      >
        {label}
      </button>
    </div>
  );
};

export default Tab;
