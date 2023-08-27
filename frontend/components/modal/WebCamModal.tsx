import WebCam from "components/face recognition/WebCam";
import React from "react";
import { SetStateType } from "types/intefaces";

const WebCamModal = ({
  setimageDescription,
  setFullimageDescription,
  onClose,
  imageDescription,
  FullimageDescription,
}: {
  setimageDescription: SetStateType<any>;
  setFullimageDescription: SetStateType<any>;
  onClose: SetStateType<any>;
  imageDescription: any;
  FullimageDescription: any;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="container mx-auto py-8">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <WebCam
              setimageDescription={setimageDescription}
              setFullimageDescription={setFullimageDescription}
              onClose={onClose}
              imageDescription={imageDescription}
              FullimageDescription={FullimageDescription}
            />
            <div className="mt-8 flex justify-center">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebCamModal;
