"use client";

// import { useState } from "react";
import RentalCard from "./RentalCard";
import { Button } from "@/components/ui/button";
import { FilterResult } from "../listingTypes";

interface ResultsProps {
  toggleMap: number;  // Use the correct type based on your usage
  setToggleMap: (value: number) => void;  // Adjust this based on how you want to change the value
  filterResult: FilterResult;
  setPage: (value: number) => void; 
  page: number;
}


const Results: React.FC<ResultsProps> = ({ toggleMap, setToggleMap, filterResult, setPage, page }) => {
  // const [cardNum, setCardNum] = useState<number>(6)
  return (
    <div className="p-6  mb-10 lg:mb-4">
      <div className="flex justify-between items-center">
        <div className="grid grid-cols-2 sm:flex gap-4">
          <Button onClick={() => {
            if (toggleMap === 1) {
              setToggleMap(0);
            } else {
              setToggleMap(1);
            }
          }}>Local Map</Button>
          <Button variant="outline">Calender</Button>
          <Button variant="outline">Add Listing</Button>
          <Button variant="outline">Create Alert For Rent Listing</Button>
        </div>
      </div>
      <h1 className="text-2xl font-bold my-6">{filterResult.total_results} Results</h1>
      <div className="grid gap-6 mb-11">
        {filterResult.listings.map((rental, index) => (
          <RentalCard key={index} {...rental} />
        ))}
        <Button variant="outline" onClick={() => {setPage(page + 1); console.log(page);}}>Read More</Button>
      </div>
    </div>
  );
};

export default Results;
