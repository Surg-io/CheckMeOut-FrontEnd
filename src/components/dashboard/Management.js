import React, { useState } from 'react';
import { PieChartTwoTone, AppstoreTwoTone, FireTwoTone, ArrowLeftOutlined } from '@ant-design/icons';
import { Card, Col, Row, Button } from 'antd';
import { Stats } from './Stats';
import { DeviceManagement } from './DeviceManagement';
import { Report } from './Report';
const BackButton = ({onBack}) => {
  return <Button 
      type="link" 
      icon={<ArrowLeftOutlined />}
      onClick={onBack}
      style={{ marginBottom: 24 }}
  />;
}

const DevicePanel = ({ onBack }) => (
  <div style={{ 
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  }}>
    <div style={{ flexShrink: 0 }}>
      <BackButton onBack={onBack}/>
    </div>
    
    <div style={{ 
      flex: 1,
      overflowY: 'auto',
      paddingRight: 8
    }}>
      <DeviceManagement/>
    </div>
  </div>
);

const StatisticPanel = ({ onBack }) => (
  <div style={{ 
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  }}>
    <div style={{ flexShrink: 0 }}>
      <BackButton onBack={onBack}/>
    </div>
    
    <div style={{ 
      flex: 1,
      overflowY: 'auto',
      paddingRight: 8
    }}>
      <Stats/>
    </div>
  </div>
);

const ReportPanel = ({ onBack }) => (
  <div style={{ padding: 24, height: '100%' }}>
    <BackButton onBack={onBack}/>
    <Report/>
  </div>
);

export const Management = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const cardConfig = {
    device: {
      Icon: AppstoreTwoTone,
      color: '#88a5d6',
      bgColor: '#e8f6ff',
      component: <DevicePanel onBack={() => setSelectedCard(null)} />
    },
    statistic: {
      Icon: PieChartTwoTone,
      color: '#77ead3',
      bgColor: '#e5fff9',
      component: <StatisticPanel onBack={() => setSelectedCard(null)} />
    },
    report: {
      Icon: FireTwoTone,
      color: '#f5ba5a',
      bgColor: '#fef5e6',
      component: <ReportPanel onBack={() => setSelectedCard(null)} />
    }
  };

  const cardStyle = (key) => ({
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    boxShadow: hoveredCard === key ? 
      '0 6px 16px -8px rgba(0, 0, 0, 0.1), 0 9px 28px 0 rgba(0, 0, 0, 0.08)' :
      '0 1px 2px -2px rgba(0, 0, 0, 0.05)',
    transform: hoveredCard === key ? 'translateY(-4px)' : 'none',
  });

  return (
    <div style={{ minHeight: 400 }}>
      {!selectedCard ? (
        <Row gutter={25}>
          {Object.entries(cardConfig).map(([key, config]) => (
            <Col span={8} key={key}>
              <Card
                variant='borderless'
                style={{
                  ...cardStyle(key),
                  width: '100%',
                  height: 300,
                  padding: '80px',
                  backgroundColor: config.bgColor,
                  boxShadow:'none'
                }}
                onMouseEnter={() => setHoveredCard(key)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedCard(key)}
              >
                <div style={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 16
                }}>
                  <config.Icon 
                    twoToneColor={config.color} 
                    style={{ 
                      fontSize: 64,
                      transition: 'transform 0.3s',
                      transform: hoveredCard === key ? 'scale(1.1)' : 'scale(1)'
                    }} 
                  />
                  <span style={{ 
                    fontSize: 18, 
                    fontWeight: 600,
                    color: 'rgba(0, 0, 0, 0.85)'
                  }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Card
          variant='borderless'
          style={{
            width: '100%',
            height: '70vh',
            maxHeight: 800,
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow:'none'
          }}
        >
          {cardConfig[selectedCard].component}
        </Card>
      )}
    </div>
  );
};