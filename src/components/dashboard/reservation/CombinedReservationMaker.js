// src/components/CombinedReservationMaker
// This component assembles multiple components in the reservation page
// TODO: Submit all content in this page
import React, { useState, useEffect } from 'react';
import LimitedDatePicker from '@root/components/dashboard/reservation/LimitedDatePicker'
import ScheduleDisplay from '@root/components/dashboard/reservation/ScheduleDisplay';
import { handleFetchSchedule, handleSubmitReservation } from '@root/services/Reservation';
import dayjs from 'dayjs';
import { Radio, Typography, Space, Divider, Button } from 'antd';
const { Title, Paragraph} = Typography;

const CombinedReservationMaker = () => {
    const [scheduleData, setScheduleData,
        purposeValue, setPurposeValue] = useState(null);

    useEffect(() => {
        const fetchScheduleOnRender = async () => {
            const now = dayjs();
            try {
                const response = await handleFetchSchedule(now);
                setScheduleData(response);
            } catch (error) {
                console.error('Error fetching today\'s schedule:', error);
            }
        };
        fetchScheduleOnRender();
    }, []);

    const onSelectPurpose = (item) => {
        setPurposeValue(purposeValue);
    };

    const handleDatePicked = async (date) => {
        try {
            const response = await handleFetchSchedule(date);
            setScheduleData(response);
        } catch (error) {
            console.error('Error fetching schedule for selected date:', error);
        }
    };

    return (
        <Typography>
            <Title level={1} >Reservation</Title>
            <Paragraph>
                Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here 
            </Paragraph>
            <Divider/>
            <div>
                <Title level={4}>Reservation Purpose</Title>
                <Radio.Group onClick={onSelectPurpose} value={purposeValue}>
                    <Space direction="vertical">
                        <Radio value={1}>Group Project</Radio>
                        <Radio value={2}>Personal Project</Radio>
                        <Radio value={3}>Class Assignments</Radio>
                        <Radio value={4}>Office Hours</Radio>
                        <Radio value={5}>Other</Radio>
                    </Space>
                </Radio.Group>
            </div>
            <Divider/>
            <div>
                <Title level={4}>Select Date</Title>
                <LimitedDatePicker onDatePicked={handleDatePicked} />
            </div>
            <Divider/>
            <div>
                <Title level={4}>Select Time</Title>
                <ScheduleDisplay response={scheduleData} />
            </div>
            <Divider/>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                <Button
                    type='primary'
                    onClick={handleSubmitReservation}
                >
                    Submit</Button>
            </div>
            
        </Typography>
    );
};
export default CombinedReservationMaker;