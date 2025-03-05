import React, { useState } from "react";

interface TimeRangePickerProps {
  timeRange: { pickup: string; dropoff: string };
  onTimeRangeChange: (range: { pickup: string; dropoff: string }) => void;
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  timeRange,
  onTimeRangeChange,
}) => {
  const times = [];
  for (let hour = 10; hour <= 19; hour++) {
    times.push(`${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`);
  }

  const handlePickupTimeChange = (time: string) => {
    onTimeRangeChange({ ...timeRange, pickup: time });
  };

  const handleDropoffTimeChange = (time: string) => {
    onTimeRangeChange({ ...timeRange, dropoff: time });
  };

  return (
    <div className="flex  gap-4">
      {/* Pickup Time */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Pickup Time
        </label>
        <select
          value={timeRange.pickup}
          onChange={(e) => handlePickupTimeChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full px-10"
        >
          {times.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      {/* Dropoff Time */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Dropoff Time
        </label>
        <select
          value={timeRange.dropoff}
          onChange={(e) => handleDropoffTimeChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full px-10"
        >
          {times.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimeRangePicker;
