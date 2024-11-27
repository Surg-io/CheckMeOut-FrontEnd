// src/components/CombinedReservationMaker
// This component assembles multiple components in the reservation page
import React, { useState } from 'react';
import LimitedDatePicker from './LimitedDatePicker';
import ScheduleDisplay from './ScheduleDisplay';
const CombinedReservationMaker = () => {
    const [scheduleData, setScheduleData] = useState(null);
    const handleDataFetched = (data) => {
        setScheduleData(data);
    };
    return (
        <div>
            <LimitedDatePicker onDataFetched={handleDataFetched} />
            <ScheduleDisplay response={scheduleData} />
        </div>
    );
};
export default CombinedReservationMaker;