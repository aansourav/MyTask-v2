import React, { useState } from "react";

const SearchTask = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchClick = () => {
    handleSearch(searchText);
  };

  const handleClearSearch = () => {
    setSearchText("");
    handleSearch("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchClick();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px]">
          <input
            type="search"
            id="search-dropdown"
            className="z-20 block w-full bg-gray-800 px-4 py-2 pr-10 focus:outline-none"
            placeholder="Search Task"
            required
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            type="button"
            className="absolute right-2 top-0 h-full rounded-e-lg text-white md:right-4"
            onClick={searchText ? handleSearchClick : handleClearSearch}
          >
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">{searchText ? "Search" : "Clear Search"}</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchTask;
