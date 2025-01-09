// src/components/LimitedDatePicker.js
// This component allow date selection from today to 7 days in the future
import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const LimitedDatePicker = ({ onDatePicked }) => {
  const now = dayjs();

  return (
    <DatePicker
      defaultValue={now}
      minDate={now}
      maxDate={now.add(7,'day')}
      onClick={(date) => {
        if (date && onDatePicked) {
          onDatePicked(date);
        }
    }}
    />
  );
};

export default LimitedDatePicker;