import React from "react";
import { getUserData } from "store/reducers/userDataSlice";
import { useAppSelector } from "store/store";
const Profile = () => {
  const {
    id,
    department,
    role,
    name,
    department_name,
    profile_image,
    personal_details: {
      address,
      mobile,
      mobile_2,
      unique_identification_number: { type, unique_id },
    },
  } = useAppSelector(getUserData).payload;
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-500 py-6">
            <h2 className="text-2xl font-semibold text-white text-center">
              Profile
            </h2>
          </div>
          <div className="px-6 py-8">
            <img
              src={profile_image}
              alt="Profile"
              width={40}
              height={40}
              className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {name}
            </h2>
            <p className="text-gray-600 text-center">
              {role == "user" ? "Team worker" : role} of {department_name}
            </p>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Address</h3>
              <p className="text-gray-700">{address}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Contacts</h3>
              <ul className="flex flex-wrap gap-2 text-gray-700">
                <li>Mobile 1 :{mobile}</li>
                <li>Mobile 2 :{mobile_2}</li>
              </ul>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">ID Proof</h3>
              <p className="text-gray-700">Type: {type}</p>
              <p className="text-gray-700">ID no: {unique_id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
