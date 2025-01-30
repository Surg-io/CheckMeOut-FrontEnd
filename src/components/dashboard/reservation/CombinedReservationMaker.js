// src/components/CombinedReservationMaker
// This component assembles multiple components in the reservation page
// TODO: Submit all content in this page
import React, { useState, useEffect } from 'react';
import LimitedDatePicker from '@root/components/dashboard/reservation/LimitedDatePicker'
import ScheduleDisplay from '@root/components/dashboard/reservation/ScheduleDisplay';
import { handleFetchSchedule, handleSubmitReservation } from '@root/services/Reservation';
import dayjs from 'dayjs';
import { Radio, Typography, Space, Divider, Button, notification, Row, Col } from 'antd';
const { Title, Paragraph} = Typography;
const Context = React.createContext({
    name: 'Default',
});

const CombinedReservationMaker = () => {
    const [api, contextHolder] = notification.useNotification();
    const [ scheduleData, setScheduleData ] = useState(null);
    const [ purposeValue, setPurposeValue ] = useState(null);
    const [ pendingSlots, setPendingSlots ] = useState([]);

    const openNotification = (status, description) => {
        api.info({
            message: `Reservation ${status}`,
            description: `${description}`,
            placement: 'bottomLeft'
        })
    }

    const fetchScheduleOnRender = async () => {
        const now = dayjs();
        try {
            const response = await handleFetchSchedule(now);
            setScheduleData(response);
        } catch (error) {
            console.error('Error fetching today\'s schedule:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchScheduleOnRender();
    }, []);

    const onSelectPurpose = (item) => {
        setPurposeValue(item.target.value);
    };

    const handleDatePicked = async (date) => {
        try {
            const response = await handleFetchSchedule(date);
            setScheduleData(response);
        } catch (error) {
            console.error('Error fetching schedule for selected date:', error);
        }
    };

    const handleSubmit = async() => {
        try{
            const response = await handleSubmitReservation(pendingSlots);
            if(response.ErrorIndicies){
                if(response.ErrorIndicies.length === 0){
                    openNotification('Success','All reservations were submitted successfully.');
                }
                else{
                    openNotification('Failed', 'Some reservations failed.');
                }
            }
            setPendingSlots([]);
            await fetchScheduleOnRender();
        }
        catch (error) {
            console.error('Error submitting reservation:', error);
            openNotification('Error', 'An unexpected error occurred while submitting reservations.');
        }
    }

    return (
        <Context.Provider value={null}>
            {contextHolder}
            <Typography>
                <Title level={1} >Reservation</Title>
                <Paragraph>
                    Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here 
                </Paragraph>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Row
                        gutter={16}
                        style={{
                            flex: 1, /* Allows the Row to grow and fill the parent height */
                            display: 'flex', /* Enables flex layout for child columns */
                        }}
                    >
                        <Col
                            span={12}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start', /* Align content to the top */
                                height: '100%', /* Ensures the column takes full height */
                            }}
                        >
                            <Divider>Reservation Purpose</Divider>
                            <Radio.Group onChange={onSelectPurpose} value={purposeValue}>
                                <Space direction="vertical">
                                    <Radio value={1}>Group Project</Radio>
                                    <Radio value={2}>Personal Project</Radio>
                                    <Radio value={3}>Class Assignments</Radio>
                                    <Radio value={4}>Office Hours</Radio>
                                    <Radio value={5}>Other</Radio>
                                </Space>
                            </Radio.Group>
                        </Col>
                        <Col
                            span={12}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start', /* Align content to the top */
                                height: '100%', /* Ensures the column takes full height */
                            }}
                        >
                            <Divider>Select Date</Divider>
                            <LimitedDatePicker onDatePicked={handleDatePicked} />
                        </Col>
                    </Row>
                </div>
                <div>
                    <Divider>Select Time</Divider>
                    <ScheduleDisplay 
                        response={scheduleData}
                        pendingSlots={pendingSlots}
                        setPendingSlots={setPendingSlots}
                    />
                </div>
                <Divider/>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                    <Button
                        type='primary'
                        onClick={handleSubmit}
                    >
                        Submit</Button>
                </div>
                
            </Typography>
        </Context.Provider>
    );
};
export default CombinedReservationMaker;