"use client"; // Mark this file as a client component

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Filter from "./ui/Filter";
import Results from "./ui/Results";
import Navtab from "./ui/Navtab";
import BottomRibbon from "./ui/BottomRibbon";

// Dynamically import the MapComponent with SSR disabled
const MapComponent = dynamic(() => import("./ui/components/MapComponent"), {
  ssr: false,
});

export default function Home() {
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
              ref={mapRef} // Attach the ref to the map container
              className={`map ${
                activeMap === 1 ? "pointer-events-auto" : "pointer-events-none"
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
              <Results toggleMap={toggleMap} setToggleMap={setToggleMap} />
            </div>
          </div>
        </div>
      </div>
      <BottomRibbon />
    </div>
  );
}
