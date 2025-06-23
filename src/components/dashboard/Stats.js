import React, { useEffect, useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Segmented, Select, Button, Divider } from 'antd';
import { handleStats } from 'services/Stats';
import { exportCSV } from 'utils/ExportCSV';
import CountUp from 'react-countup';
export const Stats = () => {
  const [stats, setStats] = useState(null);
  const [timeRange, setTimeRange] = useState('past24h'); // Default time range
  const [selectedDevice, setSelectedDevice] = useState('total'); // Default device
  const [selectedErrorDevice, setSelectedErrorDevice] = useState('average'); // Default error device to 'average'
  const formatter = (value) => <CountUp end={value} separator="," duration={1}/>;
  const percentageFormatter = (value) => (
    <CountUp 
      end={value * 100} // Multiply by 100 to display percentage
      separator=","
      duration={1}
      decimals={2} // Keep two decimal places
      suffix="%"
    />
  );
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = {
          "newUsers": {
            "past24h": 12,
            "past7d": 85,
            "past30d": 320,
            "past6m": 360
          },
          "reservationsMade": {
            "past24h": {
              "devices": [
                {
                  "deviceId": 1,
                  "deviceName": "3D Printer",
                  "count": 15
                },
                {
                  "deviceId": 2,
                  "deviceName": "Laser Cutter",
                  "count": 10
                },
                {
                  "deviceId": 3,
                  "deviceName": "CNC Router",
                  "count": 20
                },
                {
                  "deviceId": 4,
                  "deviceName": "Vinyl Cutter",
                  "count": 7
                },
                {
                  "deviceId": 5,
                  "deviceName": "UV Printer",
                  "count": 19
                }
              ],
              "total": 71
            },
            "past7d": {
              "devices": [
                {
                  "deviceId": 1,
                  "deviceName": "3D Printer",
                  "count": 110
                },
                {
                  "deviceId": 2,
                  "deviceName": "Laser Cutter",
                  "count": 85
                },
                {
                  "deviceId": 3,
                  "deviceName": "CNC Router",
                  "count": 125
                },
                {
                  "deviceId": 4,
                  "deviceName": "Vinyl Cutter",
                  "count": 24
                },
                {
                  "deviceId": 5,
                  "deviceName": "UV Printer",
                  "count": 66
                }
              ],
              "total": 410
            },
            "past30d": {
              "devices": [
                {
                  "deviceId": 1,
                  "deviceName": "3D Printer",
                  "count": 500
                },
                {
                  "deviceId": 2,
                  "deviceName": "Laser Cutter",
                  "count": 420
                },
                {
                  "deviceId": 3,
                  "deviceName": "CNC Router",
                  "count": 480
                },
                {
                  "deviceId": 4,
                  "deviceName": "Vinyl Cutter",
                  "count": 108
                },
                {
                  "deviceId": 5,
                  "deviceName": "UV Printer",
                  "count": 292
                }
              ],
              "total": 1800
            },
            "past6m": {
              "devices": [
                {
                  "deviceId": 1,
                  "deviceName": "3D Printer",
                  "count": 2800
                },
                {
                  "deviceId": 2,
                  "deviceName": "Laser Cutter",
                  "count": 2500
                },
                {
                  "deviceId": 3,
                  "deviceName": "CNC Router",
                  "count": 2300
                },
                {
                  "deviceId": 4,
                  "deviceName": "Vinyl Cutter",
                  "count": 592
                },
                {
                  "deviceId": 5,
                  "deviceName": "UV Printer",
                  "count": 1608
                }
              ],
              "total": 9800
            }
          },
          "checkinsMade": {
            "past24h": 55,
            "past7d": 380,
            "past30d": 1600,
            "past6m": 8700
          },
          "peakTime": {
            "past24h": {
              "start": "15:00",
              "end": "17:00"
            },
            "past7d": {
              "start": "14:00",
              "end": "16:00"
            }
          },
          "errorRate": {
            "past7d": {
              "devices": [
                {
                  "deviceId": 1,
                  "deviceName": "3D Printer",
                  "rate": 0.020
                },
                {
                  "deviceId": 2,
                  "deviceName": "Laser Cutter",
                  "rate": 0.017
                },
                {
                  "deviceId": 3,
                  "deviceName": "CNC Router",
                  "rate": 0.014
                },
                {
                  "deviceId": 4,
                  "deviceName": "Vinyl Cutter",
                  "rate": 0.008
                },
                {
                  "deviceId": 5,
                  "deviceName": "UV Printer",
                  "rate": 0.011
                }
              ],
              "average": 0.014
            },
            "past30d": {
              "devices": [
                {
                  "deviceId": 1,
                  "deviceName": "3D Printer",
                  "rate": 0.018
                },
                {
                  "deviceId": 2,
                  "deviceName": "Laser Cutter",
                  "rate": 0.016
                },
                {
                  "deviceId": 3,
                  "deviceName": "CNC Router",
                  "rate": 0.013
                },
                {
                  "deviceId": 4,
                  "deviceName": "Vinyl Cutter",
                  "rate": 0.007
                },
                {
                  "deviceId": 5,
                  "deviceName": "UV Printer",
                  "rate": 0.011
                }
              ],
              "average": 0.013
            },
            "past6m": {
              "devices": [
                {
                  "deviceId": 1,
                  "deviceName": "3D Printer",
                  "rate": 0.016
                },
                {
                  "deviceId": 2,
                  "deviceName": "Laser Cutter",
                  "rate": 0.014
                },
                {
                  "deviceId": 3,
                  "deviceName": "CNC Router",
                  "rate": 0.012
                },
                {
                  "deviceId": 4,
                  "deviceName": "Vinyl Cutter",
                  "rate": 0.008
                },
                {
                  "deviceId": 5,
                  "deviceName": "UV Printer",
                  "rate": 0.010
                }
              ],
              "average": 0.012
            }
          }
        };
        setStats(response);

        // Set default device when data loads
        const devices = response.reservationsMade[timeRange]?.devices || [];
        if (devices.length > 0) {
          setSelectedDevice(devices[0].deviceId);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, [timeRange]);

  if (!stats) {
    return <p>Loading...</p>;
  }

  // Find the selected device data
  const deviceStats = stats.reservationsMade[timeRange]?.devices?.find(device => device.deviceId === selectedDevice);
  const errorDeviceStats = stats.errorRate[timeRange]?.devices?.find(device => device.deviceId === selectedErrorDevice);
  const peakTime = stats.peakTime[timeRange];

  // Check if error rate data is available
  const isErrorRateAvailable = stats.errorRate[timeRange]?.devices?.length > 0;

  // Calculate the error rate and determine the styling
  const errorRate = selectedErrorDevice === 'average' 
    ? stats.errorRate[timeRange]?.average || 0
    : errorDeviceStats?.rate || 0;
  const errorRateIcon = errorRate > 0.01 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
  const errorRateColor = errorRate > 0.01 ? '#cf1322' : '#3f8600';

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Segmented
          options={[
            { label: 'Past 24 Hours', value: 'past24h' },
            { label: 'Past 7 Days', value: 'past7d' },
            { label: 'Past 30 Days', value: 'past30d' },
            { label: 'Past 6 Months', value: 'past6m' },
          ]}
          value={timeRange}
          onChange={setTimeRange}
          style={{ marginBottom: 20 }}
        />
        <Button
          type="primary"
          onClick={() => exportCSV(stats)}
          style={{ marginBottom: 20 }}
        >
          Export as CSV
        </Button>
      </div>
      <Row gutter={16}>
        {/* New Users */}
        <Col span={8}>
          <Card title="New Users" style={{ height: 200, boxShadow: 'revert' }}>
            <Statistic
              value={stats.newUsers[timeRange] || 0} // Default to 0 if data is not available
              formatter={formatter}
            />
          </Card>
        </Col>

        {/* Check-ins */}
        <Col span={8}>
          <Card title="Check-ins" style={{ height: 200 }}>
            <Statistic
              value={stats.checkinsMade[timeRange] || 0} // Default to 0 if data is not available
              formatter={formatter}
            />
          </Card>
        </Col>

        {/* Reservations */}
        <Col span={8}>
          <Card
            title="Reservations"
            extra={
              <Select
                value={selectedDevice}
                onChange={setSelectedDevice}
                style={{ width: 150 }}
                options={[{ label: 'Total', value: 'total' }, ...(stats.reservationsMade[timeRange]?.devices || []).map(device => ({
                  label: device.deviceName,
                  value: device.deviceId,
                }))]}
              />
            }
            style={{ height: 200 }}
          >
            {/* Display reservations based on selected device */}
            {selectedDevice === 'total' ? (
              <Statistic
                title="Total Reservations"
                value={stats.reservationsMade[timeRange]?.total || 0} // Default to 0 if data is not available
                valueStyle={{ color: '#1890ff' }}
                formatter={formatter}
              />
            ) : (
              deviceStats && (
                <Statistic
                  title={deviceStats.deviceName}
                  value={deviceStats.count || 0} // Default to 0 if count is not available
                  valueStyle={{ color: '#722ed1' }}
                  formatter={formatter}
                />
              )
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 20 }}>
        {/* Error Rate */}
        <Col span={8}>
          <Card
            title="Error Rate"
            extra={
              <Select
                value={selectedErrorDevice}
                onChange={setSelectedErrorDevice}
                style={{ width: 150 }}
                options={[{ label: 'Average', value: 'average' }, ...(stats.errorRate[timeRange]?.devices || []).map(device => ({
                  label: device.deviceName,
                  value: device.deviceId,
                }))]}
              />
            }
            style={{ height: 200 }}
          >
            {/* Check if error rate data is available */}
            {isErrorRateAvailable ? (
              selectedErrorDevice === 'average' ? (
                <Statistic
                  title="Average Error Rate"
                  value={errorRate}
                  valueStyle={{ color: errorRateColor }}
                  prefix={errorRateIcon}
                  formatter={percentageFormatter}
                />
              ) : (
                errorDeviceStats && (
                  <Statistic
                    title={errorDeviceStats.deviceName}
                    value={errorDeviceStats.rate}
                    valueStyle={{ color: errorRateColor }}
                    prefix={errorRateIcon}
                    formatter={percentageFormatter}
                  />
                )
              )
            ) : (
              <p>No error rate data available for this time range</p>
            )}
          </Card>
        </Col>

        {/* Peak Time */}
        <Col span={8}>
          <Card title="Peak Time" style={{ height: 200 }}>
            {peakTime ? (
              <Statistic
                value={`${peakTime.start} - ${peakTime.end}`}
              />
            ) : (
              <p>No peak time data available for this time range</p>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};