// src/components/LimitedDatePicker.js
// This component allows date selection from today to 7 days in the future
import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const LimitedDatePicker = ({ onDatePicked }) => {
  const now = dayjs();

  // Disable dates outside the allowed range
  const disabledDate = (current) => {
    return current < now.startOf('day') || current > now.add(7, 'day').endOf('day');
  };

  return (
    <DatePicker
      defaultValue={now}
      disabledDate={disabledDate} // Restrict selectable dates
      onChange={(date) => {
        if (date && onDatePicked) {
          // Format the date as { year, month, day }
          const formattedDate = dayjs(new Date(date.year(), date.month(), date.date()));
          onDatePicked(formattedDate); // Pass the formatted date object
        }
      }}
    />
  );
};

export default LimitedDatePicker;
