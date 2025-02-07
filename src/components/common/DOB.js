import React, { useState } from "react";
import { Row, Col, Input } from "antd";

const DateOfBirthInput = ({ onChange }) => {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  const handleInputChange = (setter, value) => {
    const sanitizedValue = value.replace(/[^0-9]/g, ""); // Allow only numeric input
    setter(sanitizedValue);

    if (onChange) {
      onChange({
        month: setter === setMonth ? sanitizedValue : month,
        day: setter === setDay ? sanitizedValue : day,
        year: setter === setYear ? sanitizedValue : year,
      });
    }
  };

  return (
    <Row gutter={8}>
      <Col span={8}>
        <Input
          value={month}
          placeholder="Month"
          maxLength={2}
          onChange={(e) => handleInputChange(setMonth, e.target.value)}
        />
      </Col>
      <Col span={8}>
        <Input
          value={day}
          placeholder="Day"
          maxLength={2}
          onChange={(e) => handleInputChange(setDay, e.target.value)}
        />
      </Col>
      <Col span={8}>
        <Input
          value={year}
          placeholder="Year"
          maxLength={4}
          onChange={(e) => handleInputChange(setYear, e.target.value)}
        />
      </Col>
    </Row>
  );
};

export default DateOfBirthInput;
