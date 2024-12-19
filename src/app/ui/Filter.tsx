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

interface RealEstateFilterProps {
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
  bedrooms: number | undefined;
  setBedrooms: (type: number) => void;
}

const RealEstateFilter: React.FC<RealEstateFilterProps> = ({
  setCityId,
  setMoveInDate,
  setMinPrice,
  setMaxPrice,
  setNeighborhoodId,
  propertyType, setPropertyType,
  setBedrooms,
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
    setBedrooms(isNaN(type) ? 0 : type); // Set default or handle cases for invalid values
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
        <Button
          variant="default"
          className="w-full relative"
        >
          For Rent <span className="ml-2 badge badge-danger">335</span>
        </Button>
        <Button
          variant="outline"
          className="w-full"
        >
          For Sale
        </Button>
        <Button
          variant="outline"
          className="w-full relative"
        >
          Landlord Reviews <span className="ml-2 badge badge-danger">1</span>
        </Button>
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

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Property Type:</label>
          <ToggleGroup
            type="single"
            value={propertyType.toString()}
            onValueChange={handlePropertyTypeChange}
            className="flex flex-wrap gap-2 mt-2"
          >
            {[{ type: "All", value: "171,172,173" }, { type: "House", value: 171 }, { type: "Apartment", value: 172 }, { type: "Condo", value: 173 }].map((type) => (
              <ToggleGroupItem key={type.type} value={type.value.toString()}>
                {type.type}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div>
          <label className="text-sm font-medium">Bedrooms:</label>
          <ToggleGroup
            type="single"
            className="flex flex-wrap gap-2 mt-2"
            onValueChange={handleBedroomChange}
          >
            {[{ type: "All", value: 139 }, { type: "1", value: 139 }, { type: "2", value: 139 }, { type: "3", value: 139 }, { type: "Studio", value: 139 }].map((bed) => (
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
          <Select onValueChange={handleCityChange} defaultValue="Seattle">
            <SelectTrigger>
              <SelectValue placeholder="Seattle" />
            </SelectTrigger>
            <SelectContent>
              {[{ name: "Seattle", value: 165 }, { name: "Bellevue", value: 166 }, { name: "Tacoma", value: 167 }].map((city) => (
                <SelectItem key={city.name} value={city.value.toString()}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">Neighborhood:</label>
          <Select onValueChange={handleNeighborhoodChange} defaultValue="Everywhere">
            <SelectTrigger>
              <SelectValue placeholder="Everywhere" />
            </SelectTrigger>
            <SelectContent>
              {[{ type: "Everywhere", value: 109 }, { type: "Downtown", value: 41 }, { type: "Capitol Hill", value: 48 }].map((neighborhood) => (
                <SelectItem key={neighborhood.type} value={neighborhood.value.toString()} >
                  {neighborhood.type}
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

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {["Cats", "Dogs", "Balcony", "Parking", "MFTE"].map((feature) => (
          <div key={feature} className="flex items-center space-x-2">
            <Checkbox id={feature.toLowerCase()} />
            <label
              htmlFor={feature.toLowerCase()}
              className="text-sm"
            >
              {feature}
            </label>
          </div>
        ))}
      </div>

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