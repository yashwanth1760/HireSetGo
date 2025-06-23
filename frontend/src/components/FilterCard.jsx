import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setJobFilters } from "@/redux/jobSlice";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Bangalore", "Hyderabad", "Mumbai", "Pune", "Delhi NCR",
      "Chennai"
    ],
  },
  {
    filterType: "Industry",
    array: [
      "IT", "Finance", "Healthcare", "Education",
    ],
  },
  {
    filterType: "Salary",
    array: [
      "0 - 3 LPA", "3 - 6 LPA", "6 - 10 LPA", "10 - 15 LPA", "15 - 25 LPA", "25+ LPA",
    ],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState({
    Location: [],
    Industry: [],
    Salary: [],
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleCheckboxChange = (type, value) => {
    const current = selectedFilters[type];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    const newFilter = { ...selectedFilters, [type]: updated };
    setSelectedFilters(newFilter);
    dispatch(setJobFilters(newFilter));
  };

  return (
    <>
      {/* === Mobile/Tablet Toggle Button === */}
      <div className="lg:hidden flex justify-center mb-4">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          <Filter className="h-4 w-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
          {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {/* === Filter Panel === */}
      <div
        className={`bg-white shadow-md rounded-xl p-4 w-full max-w-md mx-auto 
        ${showFilters ? "block" : "hidden"} lg:block`}
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Filter Jobs</h1>
        <hr className="mb-6 border-gray-300" />

        {filterData.map((data, i) => (
          <div key={i} className="mb-4 p-2">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              {data.filterType}
            </h2>
            <div className="flex flex-col gap-2">
              {data.array.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Checkbox
                    id={`${data.filterType}-${index}`}
                    checked={selectedFilters[data.filterType]?.includes(item)}
                    onCheckedChange={() =>
                      handleCheckboxChange(data.filterType, item)
                    }
                  />
                  <Label
                    htmlFor={`${data.filterType}-${index}`}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterCard;
