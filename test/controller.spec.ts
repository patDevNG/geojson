import { Request, Response } from 'express';
import { GeoJsonController } from '../src/controller'; // replace with actual path
import { IGeoJsonService } from '../src/service'; // replace with actual path
import supertest from 'supertest';
import express from 'express';

describe('GeoJsonController', () => {
  let serviceMock: IGeoJsonService;
  let controller: GeoJsonController;
  let app: express.Express;

  beforeEach(() => {
    serviceMock = {
      getGeoJson: jest.fn(),
    };
    
    controller = new GeoJsonController(serviceMock);

    app = express();

    app.get('/api/geojson', (req: Request, res: Response) => controller.getGeoJson(req, res));
  });

  it('should return geoJson for a valid bbox', async () => {
    const bbox = '1,2,3,4';
    const mockGeoJson = {}; 
    (serviceMock.getGeoJson as jest.Mock).mockResolvedValue(mockGeoJson);

    const response = await supertest(app).get(`/api/geojson?bbox=${bbox}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockGeoJson);
  });

});
