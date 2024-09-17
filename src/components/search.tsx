"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store"; //  store
import { setSearchTerm } from "@/app/redux/searchSlice"; //  slice


export function SearchComponent() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const placeholderTitle = "Romantic Comedy"; //This should be removed from here.Beacuse when this component became a part of big project the value will be passed as props.No if props is implemented anyway value will be stored in parent.if stored here significance can be easily infered

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value)); // Directly update Redux state
  };

  const handleSearchClick = () => {
    setSearchEnabled(!searchEnabled); // Logic for changing visibility of input box
  };

  const searchClear = () => {
    setSearchEnabled(false);
    dispatch(setSearchTerm(""));
  };

  return (
    <div className="fixed w-full top-0 flex items-center justify-between h-12 bg-black bg-opacity-100 text-white shadow-lg z-50 px-4">
      {/* Left Section (Back Button + Placeholder Title) */}
      <div className="flex items-center space-x-2">
        <img
          className="w-6 h-6 cursor-pointer"
          src="Back.png"
          alt="Back Icon"
          onClick={searchClear}
        />
        {!searchEnabled && (
          <div className="px-8 text-white ">{placeholderTitle}</div>
        )}
      </div>

      {/* Center Section (Search Input) */}
      {searchEnabled && (
        <div className="flex-grow flex justify-center">
          <input
            className="border-none rounded-full h-8 w-[50%] sm:w-[40%] md:w-[30%] lg:w-[25%] xl:w-[20%] p-2 text-black"
            onChange={handleInputChange}
            type="text"
            value={searchTerm}
            placeholder="Search for movies..."
          />
        </div>
      )}

      {/* Right Section (Search Icon) */}
      <div className="flex items-center space-x-2">
        <img
          className="w-6 h-6 cursor-pointer"
          onClick={handleSearchClick}
          src="search.png"
          alt="Search Icon"
        />
      </div>
    </div>
  );
}
