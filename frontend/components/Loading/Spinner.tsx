import React from "react";

function Spinner() {
  return (
    <div>
      <div className="h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-r-4 border-blue-500 rounded-full animate-spin" />
      </div>
    </div>
  );
}

export default Spinner;
