import React from "react";

const TaskTableModal = ({
  modalData,
  onClose,
}: {
  modalData: any;
  onClose: any;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="container mx-auto py-8">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <img
              src={`http://localhost:4000/public/images/${modalData.profile_image}`}
              alt="Profile"
              width={40}
              height={40}
              className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {modalData.name}
            </h2>
            <p className="text-gray-600 text-center">
              {modalData.role === "user" ? "Team worker" : modalData.role} of{" "}
              {modalData.department_name}
            </p>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Address</h3>
              <p className="text-gray-700">
                {modalData.personal_details.address}
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Contacts</h3>
              <ul className="flex flex-wrap gap-2 text-gray-700">
                <li>Mobile 1: {modalData.personal_details.mobile}</li>
                <li>Mobile 2: {modalData.personal_details.mobile_2}</li>
              </ul>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">ID Proof</h3>
              <p className="text-gray-700">
                Type:{" "}
                {modalData.personal_details.unique_identification_number.type}
              </p>
              <p className="text-gray-700">
                ID no:{" "}
                {
                  modalData.personal_details.unique_identification_number
                    .unique_id
                }
              </p>
            </div>
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

export default TaskTableModal;
