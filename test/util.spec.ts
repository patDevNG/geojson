import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';

const mock = new axiosMockAdapter(axios);

describe('axios', () => {
  it('should have a GET call mocked', async () => {
    const data = { someKey: "someValue" }; 
    const url = '/api/0.6/map?bbox=10,10,10,10';
    mock.onGet(url).reply(200, data);

    const response = await axios.get(url);

    expect(response.data).toEqual(data);
  });

  it('should handle error correctly', async () => {
    const url = '/api/0.6/map?bbox=10,10,10,10';
    const errorMessage = 'Network Error';
    mock.onGet(url).networkError();

    let error;
    try {
      await axios.get(url);
    } catch (e) {
      error = e as Error;
    }
    if (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(errorMessage);
    } else {
      throw new Error('No error thrown');
    }
  });
});
