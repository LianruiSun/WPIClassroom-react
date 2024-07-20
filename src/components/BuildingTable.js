import React from 'react';

const BuildingTable = ({ buildingName, data }) => {
  return (
    <div>
      <h1>{buildingName}</h1>
      <table>
        <thead>
          <tr>
            <th>Room</th>
            <th>Device ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.room}</td>
              <td>{entry.deviceId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuildingTable;
