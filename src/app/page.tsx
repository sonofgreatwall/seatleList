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
  const [what, setWhat] = useState<number>(131);
  const [moveInDate, setMoveInDate] = useState<string>('2024-12-12');
  const [propertyType, setPropertyType] = useState<number>(172);
  const [minPrice, setMinPrice] = useState<number>(900);
  const [maxPrice, setMaxPrice] = useState<number>(2500);
  const [neighborhoodId, setNeighborhoodId] = useState<number>(109);
  const [cityId, setCityId] = useState<number>(165);
  const [bedroom, setBedroom] = useState<number>(139);
  const [bathroom, setBathroom] = useState<number>(140);
  const [page, setPage] = useState<number>(0);
  const [selectedFeature, setSelectedFeature] = useState<string>("cats");

  const filterProps = {
    moveInDate, setMoveInDate,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    neighborhoodId, setNeighborhoodId,
    propertyType, setPropertyType,
    cityId, setCityId,
    bedroom, setBedroom,
    bathroom, setBathroom,
    what, setWhat,
    selectedFeature, setSelectedFeature,
  };
  console.log(filterProps);

  const [filterResult, setFilterResult] = useState<FilterResult>({
    total_results: 0,
    listings: [],
  });



  const params = new URLSearchParams({
    move_in_after: moveInDate,
    what: what.toString(),
    sqft: '',
    Neighborhoods: neighborhoodId.toString(),
    where_city: cityId.toString(),
    propertyType: propertyType.toString(),
    where: '165',
    when: '108',
    price_min: minPrice.toString(),
    Lease_Length: '',
    Deposit_Amount: '',
    Credit_Score: '',
    price_max: maxPrice.toString(),
    how_much: '111',
    bedrooms: bedroom.toString(),
    options: selectedFeature,
    sort: 'l_price',
    bathrooms: bathroom.toString(),
  });

  console.log(params.toString());
  function filter() {
    axios.get('https://seattlelisted.com/json/get_json_apartments.php?page=' + page + '&' + params.toString())
      .then(response => {
        const { total_results, ...data } = response.data;
        setFilterResult({
          total_results,
          listings: Object.values(data),

        });
      })
      .catch(error => {
        console.error(error);
        setFilterResult({ total_results: 0, listings: [] }); // Reset on error
      });
  }

  useEffect(() => {
    filter();
  }, [page, moveInDate, minPrice, maxPrice, neighborhoodId, propertyType, bedroom, cityId, selectedFeature,bathroom]);

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
        <div className="max-w-[1100px] mx-auto w-full">
          <div className="filter-results-container">
            <div className="filter">
              <Filter 
              selectedFeature={selectedFeature} 
              setSelectedFeature={setSelectedFeature} 
              whattype={what} setWhat={setWhat} 
              cityId={cityId} setCityId={setCityId} 
              moveInDate={moveInDate} 
              setMoveInDate={setMoveInDate} 
              minPrice={0} 
              setMinPrice={setMinPrice} 
              maxPrice={1000} 
              setMaxPrice={setMaxPrice} 
              neighborhoodId={neighborhoodId} 
              setNeighborhoodId={setNeighborhoodId} 
              propertyType={propertyType}
              setPropertyType={setPropertyType} 
              bedroom={bedroom} 
              setBedroom={setBedroom}
              bathroom={bathroom}
              setBathroom={setBathroom}
           />
            </div>
            <div className="results">
              <Results toggleMap={toggleMap} setToggleMap={setToggleMap} filterResult={filterResult} setPage={setPage} page={page} />
            </div>
          </div>
        </div>
      </div>
      <BottomRibbon />
    </div>
  );
}