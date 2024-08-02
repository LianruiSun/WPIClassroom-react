import { dynamoDB } from '../config';

export const fetchData = async (deviceId, date) => {
  const formattedDate = date.replace(/-/g, '_');
  const tableName = `${deviceId}_${formattedDate}`;

  const params = {
    TableName: tableName,
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    return data.Items;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const fetchLatestData = async (deviceId, date) => {
  const formattedDate = date.replace(/-/g, '_');
  const tableName = `${deviceId}_${formattedDate}`;

  const params = {
    TableName: tableName,
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    const sortedItems = data.Items.sort((a, b) => {
      const timestampA = new Date(a.timestamp.S).getTime();
      const timestampB = new Date(b.timestamp.S).getTime();
      return timestampB - timestampA;
    });

    return sortedItems[0];
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};