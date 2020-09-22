/**
 * @format
 */
import axios from 'axios';

export const getGasPrice = async () => {
  try {
    const url = 'https://gasprice.poa.network/';
    const response = await axios.get(url);
    const priceJSON = response.data;
    if (priceJSON) {
      return priceJSON.fast.toFixed(0);
    }
    return '70';
  } catch(e) {
    return '70';
  }
};
