import supertest from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { validateBBoxMiddleware } from '../src/middleware';
import { BadRequestError } from '../src/error';

function createApp(bbox: string) {
  const app = express();

  app.use((req, res, next) => {
    req.query.bbox = bbox; 
    next();
  });

  app.use(validateBBoxMiddleware);
  app.use((req, res) => {
    res.status(200).send({ message: 'Success' }); 
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).send({ message: err.message });
  });

  return app;
}

describe('validateBBoxMiddleware', () => {
  it('should call next without error for valid bbox', async () => {
    const app = createApp('1,2,3,4');
    const request = supertest(app);
    const response = await request.get('/');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Success');
  });

  it('should call next with BadRequestError for bbox of incorrect length', async () => {
    const app = createApp('1,2,3'); 
    const request = supertest(app);
    const response = await request.get('/');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('bbox must have 4 values');
  });

  it('should call next with BadRequestError for bbox with non-numeric values', async () => {
    const app = createApp('a,2,3,4'); 
    const request = supertest(app);
    const response = await request.get('/');
  
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('bbox must be numeric');
  });
  
  
});
