import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface RentalCardProps {
  available_date: string;
  price: string;
  Fulladdress: string;
  Featured_Image: string;
  price_change?: string;
  on_the_market_days?: string;
  listing_id?: string;
  sqft?: string;
  address_id?: string;
  bathrooms?: string;
  bedrooms?: string;
  deal?: string;
  Deposit_Amount?: string;
  Lease_Length?: string;
  apt_name?: string;
  suburb?: string;
  distance?: string;
  listing_website?: string;
  Social_Medias?: string;
  Average_Rating?: string;
  Review_Count?: string;
  Opening_Hours?: string;
  Phone?: string;
  name_contact?: string;
  email_contact?: string;
  Website?: string;
  Email?: string;
  id?: null;
  Name?: string;
  latitude?: string;
  longitude?: string;
  price_max?: string;
  price_min?: string;
}

const RentalCard: React.FC<RentalCardProps> = ({
  available_date,
  price,
  Fulladdress,
  Featured_Image,
  price_change,
  on_the_market_days,
  bathrooms,
  bedrooms,
  distance,
  Average_Rating,
  Review_Count,
  Opening_Hours,
  Phone,
  Website,
  Email,
}) => {
  return (
    <Card className="flex gap-4 p-4">
      <div className="w-1/4">
        <img src={Featured_Image} alt={Fulladdress} className="rounded-md w-[200px] h-[150px]" />
        <div className="flex gap-4 mt-4 justify-center flex-col">
          <Button variant="outline">Book a Tour</Button>
          <Button>More Info</Button>
        </div>
      </div>
      <div className="flex flex-col w-3/4">
        <CardHeader className="flex">
          <div>
            <CardTitle className="text-lg font-bold">{Fulladdress}</CardTitle>
            <span className="text-emerald-500 text-xl">${price}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex w-fit">
              {bedrooms && <Image src={"/bedroom.svg"} width={20} height={20} alt="bedroom" className="mx-2" />} {bedrooms}
              {bathrooms && <Image src={"/bathroom.svg"} width={20} height={20} alt="bedroom" className="mx-2" />} {bathrooms}
            </div>
            <div className="flex justify-center items-center gap-2 mt-2">
              {Average_Rating && <Badge variant="outline"> {Average_Rating}</Badge>}
              {Review_Count && <Badge variant="outline"> {Review_Count} Reviews</Badge>}
              {Website && <a className="text-sm text-gray-700" href={Website}><Image src={"/link.svg"} width={20} height={20} alt="link" /></a>}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex">
          <div className="p-2 flex flex-col items-start">
            <p className="py-2 text-sm text-gray-700"><b>Available Date:</b> {available_date}</p>
            {Opening_Hours && <p className="py-2 text-sm text-gray-700 text-left"><b>Opening hours:</b> <br /><span className="pl-3 inline-block">{Opening_Hours}</span></p>}
            {price_change && <p className="py-2 text-sm text-gray-700"><b>Price Change:</b> {price_change}</p>}
            <p className="py-2 text-sm text-gray-700"><b>On the market days:</b> {on_the_market_days}</p>
            <p className="py-2 text-sm text-gray-700"><b>Distance: </b>{distance}</p>
            {Phone && <p className="py-2 text-sm text-gray-700"><b>Phone: </b>{Phone}</p>}
            {Email && <p className="py-2 text-sm text-gray-700"><b>Email: </b>{Email}</p>}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default RentalCard;
