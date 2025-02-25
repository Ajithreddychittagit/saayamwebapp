import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPhoneAlt, FaVideo } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { PiWarningDiamondFill } from "react-icons/pi";
import { RiUserStarLine } from "react-icons/ri";
import { TbTriangleSquareCircle } from "react-icons/tb";
import { VscCalendar } from "react-icons/vsc";
import { useSelector } from "react-redux";
import "./RequestDescription.css";

const attributes = [
  {
    context: "July 1, 2024",
    type: "Creation Date",
    icon: <VscCalendar size={22} />,
    phoneIcon: false,
    videoIcon: false,
  },
  {
    context: "Maintenance",
    type: "Category",
    icon: <TbTriangleSquareCircle size={22} />,
    phoneIcon: false,
    videoIcon: false,
  },
  {
    context: "Peter parker",
    type: "Requester",
    icon: <IoPersonCircle size={26} />,
    phoneIcon: true,
    videoIcon: true,
  },
  {
    context: "Ethan Marshall",
    type: "Volunteer",
    icon: <RiUserStarLine size={22} />,
    phoneIcon: true,
    videoIcon: true,
  },
];

const RequestDescription = ({ requestData }) => {
  const { t } = useTranslation();
  const token = useSelector((state) => state.auth.idToken);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // attributes[0].context = requestData?.creationDate;
  // attributes[1].context = requestData?.category;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    setIsEditing(true);
  };

  const handleOverlayClick = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "unset"; // Restore background scrolling
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isEditing]);

  return (
    <>
      <div className="border border-gray-300 rounded-lg p-4">
        <div className="">
          <ul className="w-full flex flex-col sm:flex-row items-start flex-wrap md:gap-2 lg:gap-10 text-xs text-gray-700 sm:items-center justify-between">
            {attributes.map(
              (header, index) =>
                !header.phoneIcon && (
                  <li
                    key={index}
                    className="flex items-center gap-2 group relative"
                  >
                    {header.icon}
                    {header.context}
                    <div className="absolute top-6 px-5 py-2 bg-gray-50 border shadow-md rounded-xl flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {header.type}
                    </div>
                    {/* {header.phoneIcon && (
                  <FaPhoneAlt className="cursor-pointer" size={15} />
                )}
                {header.videoIcon && (
                  <FaVideo className="cursor-pointer" size={17} />
                )} */}
                  </li>
                ),
            )}
            <li>
              <span className="bg-green-200 text-black-800 text-xs md:text-sm px-3 py-1 rounded-full items-center flex">
                {requestData.status}
              </span>
            </li>
            <li>
              <div className="flex items-center">
                <PiWarningDiamondFill className="mr-1 text-red-500" />
                <span className="text-md font-bold">
                  {requestData.priority}
                </span>
              </div>
            </li>
          </ul>
          <div className="w-full m-0">
            <p className="text-sm p-5">{requestData.description}</p>
          </div>
          <div className="flex flex-row gap-5 justify-between">
            {attributes.map(
              (header, index) =>
                header.phoneIcon && (
                  <li
                    key={index}
                    className="flex items-center gap-2 group relative"
                  >
                    {header.icon}
                    {header.context}
                    <div className="absolute top-6 px-5 py-2 bg-gray-50 border shadow-md rounded-xl flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {header.type}
                    </div>
                    {header.phoneIcon && (
                      <FaPhoneAlt className="cursor-pointer" size={15} />
                    )}
                    {header.videoIcon && (
                      <FaVideo className="cursor-pointer" size={17} />
                    )}
                  </li>
                ),
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestDescription;
