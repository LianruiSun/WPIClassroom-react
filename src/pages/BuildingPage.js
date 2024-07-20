import React from 'react';
import { useParams } from 'react-router-dom';
import BuildingTable from '../components/BuildingTable';
import { buildingData } from '../data';

const BuildingPage = () => {
  const { buildingName } = useParams();
  const data = buildingData[buildingName] || [];

  return <BuildingTable buildingName={buildingName} data={data} />;
};

export default BuildingPage;
