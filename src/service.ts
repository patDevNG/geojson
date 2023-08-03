import { injectable } from 'inversify';
import { getOsmData } from './util';
import osmtogeojson from 'osmtogeojson';
export interface IGeoJsonService {
  getGeoJson( bbox: any): Promise<any>;
}

@injectable()
export class GeoJsonService implements IGeoJsonService {
 async  getGeoJson(bbox: any): Promise<any> {
  try {
    const osmData = await getOsmData(bbox);
    return osmtogeojson(osmData);
  } catch (error) {
    throw error;
  }

  }
  
}