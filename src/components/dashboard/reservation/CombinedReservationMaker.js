// src/components/CombinedReservationMaker
// This component assembles multiple components in the reservation page
import React, { useState, useEffect } from 'react';
import LimitedDatePicker from '@root/components/dashboard/reservation/LimitedDatePicker'
import ScheduleDisplay from '@root/components/dashboard/reservation/ScheduleDisplay';
import { handleFetchSchedule, handleSubmitReservation } from '@root/services/Reservation';
import dayjs from 'dayjs';
import config from '@root/config/config';
import { Radio, Typography, Space, Divider, Button, notification, Row, Col, Spin } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import ReactMarkdown from 'react-markdown'
import { useNotification } from '@root/context/NotificationContext';

const { Title, Paragraph} = Typography;

const CombinedReservationMaker = () => {
    const showNotification = useNotification();
    const [ scheduleData, setScheduleData ] = useState(null);
    const [ purposeValue, setPurposeValue ] = useState(null);
    const [ pendingSlots, setPendingSlots ] = useState([]);
    const [content, setContent] = useState("");

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
        fetch("/docs/reservation.md")
            .then((res) => res.text())
            .then((text) => setContent(text))
            .catch(() => setContent("Failed to load guidelines."));
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
                    showNotification('success','All reservations were submitted successfully.');
                }
                else{
                    showNotification('error', 'Some reservations failed.');
                }
            }
            setPendingSlots([]);
            await fetchScheduleOnRender();
        }
        catch (error) {
            console.error('Error submitting reservation:', error);
            showNotification('error', 'An unexpected error occurred while submitting reservations.');
        }
    }

    return (
        <Typography>
            <Title level={1} >Reservation</Title>
            <Paragraph>
                {content ? (
                    <ReactMarkdown>{content}</ReactMarkdown>
                ) : (
                    <Spin indicator={<LoadingOutlined spin />} />
                )}
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
                        <LimitedDatePicker onDatePicked={handleDatePicked}/>
                    </Col>
                </Row>
            </div>
            <div>
                <Divider>Select Time</Divider>
                <div
                    style={{
                        display:'flex',
                        flexDirection:'row',
                        padding:'10px 15px'
                }}>
                    <div
                        style={{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'center',
                            alignItems:'center',
                            padding:'0px 10px 0px 0px'
                        }}>
                        <div
                            style={{
                                background: config.reservationStatus.available.color,
                                height: '8px',
                                width: '8px',
                                margin:'0px 5px'
                            }}
                        />
                        <>Available</>
                    </div>
                    <div
                        style={{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'center',
                            alignItems:'center',
                            padding:'0px 10px 0px 0px'
                        }}>
                        <div
                            style={{
                                background: config.reservationStatus.reserved.color,
                                height: '8px',
                                width: '8px',
                                margin:'0px 5px'
                            }}
                        />
                        <>Reserved</>
                    </div>
                    <div
                        style={{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'center',
                            alignItems:'center',
                            padding:'0px 10px 0px 0px'
                        }}>
                        <div
                            style={{
                                background: config.reservationStatus.outOfService.color,
                                height: '8px',
                                width: '8px',
                                margin:'0px 5px'
                            }}
                        />
                        <>Out Of Service</>
                    </div>
                    <div
                        style={{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'center',
                            alignItems:'center',
                            padding:'0px 10px 0px 0px'
                        }}>
                        <div
                            style={{
                                background: config.reservationStatus.pending.color,
                                height: '8px',
                                width: '8px',
                                margin:'0px 5px'
                            }}
                        />
                        <>Selected</>
                    </div>
                </div>
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
    );
};
export default CombinedReservationMaker;