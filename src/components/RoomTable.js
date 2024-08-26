import React, { useState, useEffect, useCallback } from 'react';
import { fetchData } from '../dynamoDB/dynamodbService';
import { Column, Table, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import TestPage from './TestPage';

const BuildingTable = ({ buildingName, deviceId, date }) => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleFetchData = useCallback(async () => {
    try {
      const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      const fetchedData = await fetchData(deviceId, formattedDate);
      console.log('Fetched Data:', fetchedData);
      setData(transformData(fetchedData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [deviceId, date]);

  useEffect(() => {
    if (deviceId && date) {
      handleFetchData();
    }
  }, [deviceId, date, handleFetchData]);

  const transformData = (data) => {
    return data.map((entry) => ({
      timestamp: entry.timestamp?.S || 'N/A',
      co2: entry.co2?.N || 'N/A',
      humid: entry.humid?.N || 'N/A',
      light: entry.light?.N || 'N/A',
      noise: entry.noise?.N || 'N/A',
      pm10: entry.pm10?.N || 'N/A',
      pm25: entry.pm25?.N || 'N/A',
      score: entry.score?.N || 'N/A',
      temp: entry.temp?.N || 'N/A',
      voc: entry.voc?.N || 'N/A',
    }));
  };

  const sortData = (data) => {
    return data.sort((a, b) => {
      const dateA = new Date(a.timestamp || '1970-01-01');
      const dateB = new Date(b.timestamp || '1970-01-01');
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setData((prevData) => sortData([...prevData]));
  };

  const sortedData = sortData(data);

  return (
    <div style={{ height: '100vh', padding: '20px' }}>
      <TestPage chartData={sortedData} /> {/* Pass the fetched data to TestPage */}
      <div style={{ flex: '1 1 auto', height: 'calc(100% - 60px)' }}>
        <AutoSizer>
          {({ height, width }) => (
            <Table
              width={width}
              height={height}
              headerHeight={40}
              rowHeight={30}
              rowCount={sortedData.length}
              rowGetter={({ index }) => sortedData[index]}
            >
              <Column
                label={
                  <div>
                    Timestamp
                    <button onClick={handleSortOrderChange}>
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                  </div>
                }
                dataKey="timestamp"
                width={200}
              />
              <Column label="CO2" dataKey="co2" width={100} />
              <Column label="Humidity" dataKey="humid" width={100} />
              <Column label="Light" dataKey="light" width={100} />
              <Column label="Noise" dataKey="noise" width={100} />
              <Column label="PM10" dataKey="pm10" width={100} />
              <Column label="PM25" dataKey="pm25" width={100} />
              <Column label="Score" dataKey="score" width={100} />
              <Column label="Temperature" dataKey="temp" width={100} />
              <Column label="VOC" dataKey="voc" width={100} />
            </Table>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default BuildingTable;
