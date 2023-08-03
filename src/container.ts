import { Container} from 'inversify';
import { GeoJsonService } from './service';
export const container = new Container({
  defaultScope: 'Singleton',
});

container.bind('IGeoJsonService').to(GeoJsonService);