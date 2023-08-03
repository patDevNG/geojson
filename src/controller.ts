import { Response, NextFunction, Request } from 'express';
import { controller, httpGet} from 'inversify-express-utils';
import { IGeoJsonService } from './service';
import { validateBBoxMiddleware } from './middleware';
import { inject } from 'inversify';

interface IGeoJsonController {
  getGeoJson(req: Request, res: Response, next: NextFunction): Promise<void>;
}

@controller('/api')
export class GeoJsonController implements IGeoJsonController {
private readonly geoJsonService: IGeoJsonService;
constructor( @inject('IGeoJsonService') geoJsonService: IGeoJsonService) {
  this.geoJsonService = geoJsonService;
}

@httpGet('/geojson', validateBBoxMiddleware)
public async getGeoJson(req: Request, res: Response): Promise<void> {
const bbox = req.query.bbox;
const geoJson = await this.geoJsonService.getGeoJson(bbox);
res.status(200).json(geoJson);
}
}