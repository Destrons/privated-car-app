import axios from 'axios';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api/directions/json';

export const calculateRoute = async (origin: string, destination: string) => {
  const response = await axios.get(GOOGLE_API_URL, {
    params: {
      origin,
      destination,
      key: GOOGLE_API_KEY,
    },
  });

  return response.data.routes[0].legs[0];
};
