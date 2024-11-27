// src/components/LimitedDatePicker.js
// This component allow date selection from today to 7 days in the future
import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import config from '../config/config';

var now = dayjs(); // Initialize the time upon rendering

const handleOk = async (values) => {
  // Selection submission logic
  try {
    const selectedDate = {
      year: values.$y,
      month: values.$M+1,
      day: values.$D,
      fullDate: values.$d.toISOString()
    };
    
    // Send the selected to the backend
    const response = await fetch(`${config.apiBaseUrl}/searchdate`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(selectedDate)
    });

    // Handle the server response
    if (response.ok) {
      console.log('Selection successful:', await response.json());
    } else {
      console.error('Selection failed', await response.json());
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
const LimitedDatePicker = () => (
  <DatePicker
    defaultValue={now}
    minDate={now}
    maxDate={now.add(7,'day')} // Max 7 days ahead
    needConfirm={true}
    onOk={handleOk}
  />
);
export default LimitedDatePicker;