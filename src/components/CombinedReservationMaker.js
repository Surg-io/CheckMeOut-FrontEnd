// src/components/CombinedReservationMaker
// This component assembles multiple components in the reservation page
import React, { useState, useEffect } from 'react';
import LimitedDatePicker from './LimitedDatePicker';
import ScheduleDisplay from './ScheduleDisplay';
import { handleFetchSchedule } from '../services/Reservation';
import dayjs from 'dayjs';

const CombinedReservationMaker = () => {
    const [scheduleData, setScheduleData] = useState(null);

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

    const handleDataFetched = async (date) => {
        try {
            const response = await handleFetchSchedule(date);
            setScheduleData(response);
        } catch (error) {
            console.error('Error fetching schedule for selected date:', error);
        }
    };
    return (
        <div>
            <LimitedDatePicker onDataFetched={handleDataFetched} />
            <ScheduleDisplay response={scheduleData} />
        </div>
    );
};
export default CombinedReservationMaker;