// src/components/LimitedDatePicker.js
// This component allows date selection from today to 7 days in the future
import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const LimitedDatePicker = ({ onDatePicked }) => {
  const now = dayjs();

  // Disable dates outside the allowed range
  const disabledDate = (current) => {
    return (
      current < now.startOf("day") || current > now.add(7, "day").endOf("day")
    );
  };

  return (
    <DatePicker
      defaultValue={now}
      disabledDate={disabledDate} // Restrict selectable dates
      onChange={(date) => {
        if (!date) return;
        const utcDate = date.utc().startOf('day');
        onDatePicked(utcDate);
      }}
    />
  );
};

export default LimitedDatePicker;
