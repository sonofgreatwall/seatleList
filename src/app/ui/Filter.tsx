"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { whats, propertyTypes, beds, bathrooms, cities, neighborhoods, options } from "@/app/ui/FilterParams"

interface RealEstateFilterProps {
  whattype: number;
  setWhat: (what: number) => void;
  cityId: number;
  setCityId: (id: number) => void;
  moveInDate: string;
  setMoveInDate: (date: string) => void;
  minPrice: number;
  setMinPrice: (price: number) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  neighborhoodId: number;
  setNeighborhoodId: (id: number) => void;
  propertyType: number;
  setPropertyType: (type: number) => void;
  bedroom: number | undefined;
  setBedroom: (type: number) => void;
  bathroom: number | undefined;
  setBathroom: (type: number) => void;
  selectedFeature: string;
  setSelectedFeature: (selectedFeature: string) => void;
}

const RealEstateFilter: React.FC<RealEstateFilterProps> = ({
  whattype, setWhat,
  setCityId,
  setMoveInDate,
  setMinPrice,
  setMaxPrice,
  setNeighborhoodId,
  propertyType, setPropertyType,
  bedroom, setBedroom,
  bathroom, setBathroom,
  selectedFeature, setSelectedFeature,
}) => {

  const [priceRange, setPriceRange] = useState([900, 2500]);

  const handlePriceChange = (range: number[]) => {
    setPriceRange(range);
    setMinPrice(range[0]);
    setMaxPrice(range[1]);
  };
  const handlePropertyTypeChange = (value: string) => {
    const type = parseInt(value);
    setPropertyType(isNaN(type) ? 0 : type); // Set default or handle cases for invalid values
  };
  const handleBedroomChange = (value: string) => {
    const type = parseInt(value);
    setBedroom(isNaN(type) ? 0 : type); // Set default or handle cases for invalid values
  };
  const handleBathroomChange = (value: string) => {
    const type = parseInt(value);
    setBathroom(isNaN(type) ? 0 : type); // Set default or handle cases for invalid values
  };

  const handleNeighborhoodChange = (value: string) => {
    const id = parseInt(value);
    setNeighborhoodId(isNaN(id) ? 0 : id); // Similar handling as above
  };

  const handleCityChange = (value: string) => {
    const id = parseInt(value);
    setCityId(isNaN(id) ? 0 : id); // Similar handling as above
  };
  const handleMoveInDateChange = (value: string) => {
    setMoveInDate(value);
  };
  return (
    <Card className="w-full p-4 space-y-6">
      <div className="flex flex-col sm:flex-row gap-2">
        {whats.map((what) => (
          <Button key={what.type}
            value={String(what.value).toLowerCase()}
            variant={whattype == what.value ? "default" : "outline"}
            className="w-full relative"
            onClick={() => setWhat(what.value)}
          >
            {what.type} <span className="ml-2 badge badge-danger"></span>
          </Button>
        ))}

      </div>

      <div>
        <label className="text-sm font-medium">Price:</label>
        <Slider
          value={priceRange}
          onValueChange={handlePriceChange}
          min={500}
          max={5000}
          step={100}
          className="mt-2"
        />
        <div className="text-sm text-gray-600 mt-1">
          ${priceRange[0]} - ${priceRange[1].toLocaleString()}
        </div>
      </div>

      <div className="grid sm:grid-cols-1 gap-4">
        <div className='flex items-center gap-2'>
          <label className=" font-bold mt-2">Property Type:</label>
          <ToggleGroup
            type="single"
            value={propertyType.toString()}
            onValueChange={handlePropertyTypeChange}
            className="flex flex-wrap gap-2 mt-2 justify-center w-[80%]"
          >
            {propertyTypes.map((type) => (
              <ToggleGroupItem key={type.type} value={type.value.toString()}>
                {type.type}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className='flex items-center gap-2'>
          <label className=" font-bold mt-2">Bedrooms:</label>
          <ToggleGroup
            type="single"
            value={bedroom?.toString()}
            className="flex flex-wrap w-full gap-2 mt-2 justify-center"
            onValueChange={handleBedroomChange}
          >
            {beds.map((bed) => (
              <ToggleGroupItem key={bed.type} value={String(bed.value).toLowerCase()}>
                {bed.type}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className='flex items-center gap-2'>
          <label className=" font-bold mt-2">Bathrooms:</label>
          <ToggleGroup
            type="single"
            value={bathroom?.toString()}
            className="flex flex-wrap w-full gap-2 mt-2 justify-center"
            onValueChange={handleBathroomChange}
          >
            {bathrooms.map((bed) => (
              <ToggleGroupItem key={bed.type} value={String(bed.value).toLowerCase()}>
                {bed.type}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">City:</label>
          <Select onValueChange={handleCityChange} defaultValue={"165"}>
            <SelectTrigger>
              <SelectValue placeholder="Seattle" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.name} value={city.value.toString()}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">Neighborhood:</label>
          <Select onValueChange={handleNeighborhoodChange} defaultValue="109">
            <SelectTrigger>
              <SelectValue placeholder="Everywhere" />
            </SelectTrigger>
            <SelectContent>
              {neighborhoods.map((neighborhood) => (
                <SelectItem key={neighborhood.name} value={neighborhood.value.toString()} >
                  {neighborhood.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Input type="date" placeholder="Move-in Date" onChange={(e) => handleMoveInDateChange(e.target.value)} />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Term" />
          </SelectTrigger>
          <SelectContent>
            {["Short-Term", "Long-Term"].map((term) => (
              <SelectItem key={term} value={term.toLowerCase()}>{term}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input placeholder="Max Deposit" />
        <Input placeholder="Min. ft²" />
      </div>

      <Card className="w-full p-4 space-y-6">
        {/* ... (existing components such as price, property type, etc.) */}

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {options.map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                id={feature.toLowerCase()}
                checked={selectedFeature === feature.toLowerCase()} // Check if this checkbox is selected
                onClick={() => setSelectedFeature(feature.toLowerCase())} // Update the state when clicked
              />
              <label htmlFor={feature.toLowerCase()} className="text-sm">
                {feature}
              </label>
            </div>
          ))}
        </div>

        {/* ... (rest of the component remains unchanged) */}
      </Card>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          {["Lowest Price", "Highest Price", "Newest"].map((sort) => (
            <SelectItem key={sort} value={sort.toLowerCase()}>{sort}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Card>
  );
};

export default RealEstateFilter;