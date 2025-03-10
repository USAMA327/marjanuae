import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CarRentalForm() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [useDifferentReturn, setUseDifferentReturn] = useState(false);
  const [pickupDate, setPickupDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());

  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-md max-w-5xl mx-auto mt-10 flex items-center space-x-4">
      <div className="flex-1">
        <h2 className="text-xl font-semibold">Rent the car</h2>
        <p className="text-sm text-gray-600">Pick-up & return</p>
        <div className="relative mt-2">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Airport, city or address"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring focus:ring-gray-300"
          />
        </div>
        <label className="flex items-center mt-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={useDifferentReturn}
            onChange={() => setUseDifferentReturn(!useDifferentReturn)}
            className="mr-2"
          />
          Different return location
        </label>
        <p className="text-blue-600 text-sm cursor-pointer mt-1">
          Apply corporate rate
        </p>
      </div>

      <div className="flex space-x-4">
        <div>
          <p className="text-sm text-gray-600">Pick-up date</p>
          <div className="relative mt-2">
            <MdOutlineDateRange className="absolute left-3 top-3 text-gray-500" />
            <DatePicker
              selected={pickupDate}
              onChange={(date: Date) => setPickupDate(date)}
              showTimeSelect
              dateFormat="dd. MMM h:mm aa"
              className="w-40 pl-10 pr-4 py-2 border rounded-md focus:ring focus:ring-gray-300"
            />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600">Return date</p>
          <div className="relative mt-2">
            <MdOutlineDateRange className="absolute left-3 top-3 text-gray-500" />
            <DatePicker
              selected={returnDate}
              onChange={(date: Date) => setReturnDate(date)}
              showTimeSelect
              dateFormat="dd. MMM h:mm aa"
              className="w-40 pl-10 pr-4 py-2 border rounded-md focus:ring focus:ring-gray-300"
            />
          </div>
        </div>
      </div>

      <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition">
        Show cars
      </button>
    </div>
  );
}
