import { GeoJsonService } from '../src/service'; // replace with actual path
import { getOsmData } from '../src/util'; // replace with actual path
import osmtogeojson from 'osmtogeojson';
import 'reflect-metadata';
jest.mock('../src/util'); // replace with actual path
jest.mock('osmtogeojson');

describe('GeoJsonService', () => {
  it('should call getOsmData and osmtogeojson', async () => {
    const mockData = {
      type: "FeatureCollection" as "FeatureCollection",
      features: []
    };
    
    const geojsonData = {
      type: "FeatureCollection" as "FeatureCollection",
      features: []
    };

    (getOsmData as jest.MockedFunction<typeof getOsmData>).mockResolvedValueOnce(mockData);
    (osmtogeojson as jest.MockedFunction<typeof osmtogeojson>).mockReturnValueOnce(geojsonData);

    const geoJsonService = new GeoJsonService();

    const result = await geoJsonService.getGeoJson("10,10,10,10");

    expect(result).toEqual(geojsonData);
    expect(getOsmData).toBeCalledWith("10,10,10,10");
    expect(osmtogeojson).toBeCalledWith(mockData);
  });
});
