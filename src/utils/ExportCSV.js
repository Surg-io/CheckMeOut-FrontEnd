export const exportCSV = (data) => {
  const timePeriods = ['past24h', 'past7d', 'past30d', 'past6m'];
  const timeHeaders = ['Past 24h', 'Past 7d', 'Past 30d', 'Past 6m'];
  
  const getValue = (obj, path) => {
    const keys = path.split('.');
    let value = obj;
    for (const key of keys) {
      if (!value || value[key] === undefined) return '-';
      value = value[key];
    }
    return value;
  };

  const mainMetrics = [
    { 
      name: 'New Users', 
      path: 'newUsers' 
    },
    { 
      name: 'Reservations', 
      getValue: (data, period) => {
        const total = data.reservationsMade[period]?.total;
        return total !== undefined ? total : '-';
      }
    },
    { 
      name: 'Checkins', 
      path: 'checkinsMade' 
    },
    { 
      name: 'Peak Time', 
      getValue: (data, period) => {
        const time = data.peakTime[period];
        return time !== undefined ? `${time.start}-${time.end}` : '-';
      }
    },
    {
      name: 'Error Rate',
      getValue: (data, period) => {
        const rate = data.errorRate[period]?.average;
        return rate !== undefined ? rate.toFixed(3) : '-';
      }
    }
  ];

  let csv = 'Metrics,' + timeHeaders.join(',') + '\n';
  mainMetrics.forEach((metric) => {
    const values = timePeriods.map(period => {
      if (metric.getValue) {
        return metric.getValue(data, period);
      }
      
      const value = getValue(data, `${metric.path}.${period}`);
      return metric.formatter 
        ? metric.formatter(value)
        : (value ?? '-');
    });
    
    csv += `${metric.name},${values.join(',')}\n`;
  });

  csv += '\nReservation,,Past 24h,Past 7d,Past 30d,Past 6m\n';
  const devices = data.reservationsMade.past24h.devices;
  devices.forEach(device => {
    const values = timePeriods.map(period => {
      return data.reservationsMade[period]?.devices
        ?.find(d => d.deviceId === device.deviceId)?.count ?? '-';
    });
    csv += `${device.deviceName},${device.deviceId},${values.join(',')}\n`;
  });

  csv += '\nError Rate,,Past 24h,Past 7d,Past 30d,Past 6m\n';
  const errorDevices = data.errorRate.past7d.devices;
  errorDevices.forEach(device => {
    const values = timePeriods.map(period => {
      const rateData = data.errorRate[period];
      if (!rateData) return '-';
      return rateData.devices.find(d => d.deviceId === device.deviceId)?.rate?.toFixed(3) ?? '-';
    });
    csv += `${device.deviceName},${device.deviceId},${values.join(',')}\n`;
  });

  const downloadCSV = (csvContent) => {
    const blob = new Blob(["\ufeff" + csvContent], { 
      type: 'text/csv;charset=utf-8;' 
    });
  
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'report.csv');
    
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  downloadCSV(csv);
  return csv;
};