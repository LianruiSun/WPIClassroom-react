export const fetchData = async (deviceId, date) => {
  const formattedDate = date.replace(/-/g, '-');
  const lambdaUrl = 'https://efqf3krkon5ksaqe6q53wmjtou0czlty.lambda-url.us-east-1.on.aws/';

  const params = new URLSearchParams({
    room_name: deviceId,
    date: formattedDate,
  });

  const requestUrl = `${lambdaUrl}?${params.toString()}`;

  try {
    const response = await fetch(requestUrl, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const fetchLatestData = async (deviceId, date) => {

};