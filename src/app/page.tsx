"use client"; // Mark this file as a client component

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Filter from "./ui/Filter";
import Results from "./ui/Results";
import Navtab from "./ui/Navtab";
import BottomRibbon from "./ui/BottomRibbon";
import axios from "axios";
import { FilterResult } from "./listingTypes";

// Dynamically import the MapComponent with SSR disabled
const MapComponent = dynamic(() => import("./ui/components/MapComponent"), {
  ssr: false,
});



export default function Home() {
  const [filterResult, setFilterResult] = useState<FilterResult>({
    total_results: 0,
    listings: [],
  });

  function filter() {
    axios.get('https://seattlelisted.com/json/get_json_apartments.php?page=0&move_in_after=2024-12-12&what=131&sqft=&Neighborhoods=109&where_city=165&propertyType=172&where=165&when=108&price_min=900&Lease_Length=&Deposit_Amount=&Credit_Score=&price_max=2500&how_much=111&bedrooms=139&options=&sort=l_price&bathrooms=140')
      .then(response => {
        const { total_results, ...data } = response.data;
        setFilterResult({
          total_results,
          listings: Object.values(data),
           // Assume data has the listings array
        });
      })
      .catch(error => {
        console.error(error);
        setFilterResult({ total_results: 0, listings: [] }); // Reset on error
      });
  }

  useEffect(() => {
    filter();
  }, []);

  console.log(filterResult.total_results, filterResult.listings);

  const [toggleMap, setToggleMap] = useState<number>(1);
  const [activeMap, setActiveMap] = useState<number>(0);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mapRef.current && !mapRef.current.contains(event.target as Node)) {
        setActiveMap(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <Navtab />
      <div className={`main ${toggleMap === 1 ? "grid-cols-2" : "grid-cols-1"}`}>
        {toggleMap === 1 && (
          <div
            onClick={(e) => {
              e.preventDefault();
            }}
            onDoubleClick={(e) => {
              e.preventDefault();
              if (activeMap === 0) setActiveMap(1);
              else setActiveMap(0);
            }}
          >
            <div
              ref={mapRef}
              className={`map ${activeMap === 1 ? "pointer-events-auto" : "pointer-events-none"
                }`}
            >
              <MapComponent />
            </div>
          </div>
        )}
        <div className="max-w-[1100px] mx-auto">
          <div className="filter-results-container">
            <div className="filter">
              <Filter />
            </div>
            <div className="results">
              <Results toggleMap={toggleMap} setToggleMap={setToggleMap} filterResult={filterResult} />
            </div>
          </div>
        </div>
      </div>
      <BottomRibbon />
    </div>
  );
}