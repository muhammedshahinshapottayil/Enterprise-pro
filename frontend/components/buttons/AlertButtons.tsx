import React from "react";
import { useState } from "react";

const ConfirmAlert = ({
  onClick,
  children,
}: {
  onClick: Function;
  children: any;
}) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleConfirmation = () => {
    // Perform your action here upon confirmation
    onClick();
    setShowAlert(false);
  };

  return (
    <div>
      <button onClick={() => setShowAlert(true)}>{children}</button>
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold">Confirm Action</h2>
            <p className="mt-2">Are you sure you want to proceed?</p>
            <div className="mt-4">
              <button
                className="mr-4 px-4 py-2 rounded-lg bg-blue-500 text-white"
                onClick={handleConfirmation}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700"
                onClick={() => setShowAlert(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmAlert;
