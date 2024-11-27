// src/components/LimitedDatePicker.js
// This component allow date selection from today to 7 days in the future
import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import config from '../config/config';


const LimitedDatePicker = ({ onDataFetched }) => {
  const now = dayjs();

  const handleOk = async (value) => {
    const selectedDate = {
      year: value.$y,
      month: value.$M + 1,
      day: value.$D,
      fullDate: value.$d.toISOString()
    };

    try {
      // Send the selected date to the backend
      const response = await fetch(`${config.apiBaseUrl}/searchdate`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(selectedDate),
      });

      // Handle the server response
      if (response.ok) {
        const data = await response.json();
        console.log('Selection successful:', data);
        if (onDataFetched) {
          onDataFetched(data); // Pass the fetched data to the parent component
        }
      } else {
        console.error('Selection failed:', await response.text());
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <DatePicker
      defaultValue={now}
      minDate={now}
      maxDate={now.add(7,'day')}
      onOk={handleOk}
    />
  );
};

export default LimitedDatePicker;