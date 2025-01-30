import { Typography, List, DatePicker } from "antd";
import { useState } from 'react';

const { Title, Paragraph} = Typography;
const History = ({})=>{
    const [data, setData] = useState([]);
    return (
        <Typography>
            <Title level={1}>History</Title>
            <div>
                
            </div>
        </Typography>
    );
};

export default History;