import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/payments';

export const getPayments = async () => {
  const response = await axios.get(`${API_BASE_URL}/list`);
  const rawData = response.data;

  if (!rawData || !Array.isArray(rawData.data)) {
    throw new TypeError("Expected an array but received: " + typeof rawData.data);
  }

  return rawData.data;
};