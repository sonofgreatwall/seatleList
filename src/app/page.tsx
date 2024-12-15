"use client";
import dynamic from "next/dynamic";
import Filter from "./ui/Filter";
import Results from "./ui/Results";
import Navtab from "./ui/Navtab";
import { useState } from "react";
import BottomRibbon from "./ui/BottomRibbon";

// Dynamically import the MapComponent with SSR disabled
const MapComponent = dynamic(() => import("./ui/components/MapComponent"), {
  ssr: false,
});

export default function Home() {
  const [toggleMap, setToggleMap] = useState<number>(1);
  const [activeMap, setActiveMap] = useState<number>(0);
  console.log(activeMap);
  

  return (
    <div>
      <Navtab />
      <div className={`main ${toggleMap === 1 ? "grid-cols-2" : "grid-cols-1"}`} onClick={() => {setActiveMap(0)}}>
        {toggleMap === 1 && (
          <div onDoubleClick={() => { setActiveMap(1); }}>
            <div className={`map ${activeMap == 1? `z-10` : `z-[-30]`} `} >
              <MapComponent />
            </div>
          </div>
        )}
        {/* sdasa */}
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