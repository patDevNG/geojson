import { Response, NextFunction, Request } from 'express';
import { BadRequestError } from './error';

export function validateBBoxMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const bbox = req.query.bbox;

  if (typeof bbox === 'string') {
    const bboxArray = bbox.split(',').map((item) => Number(item));
    if (bboxArray.length !== 4) {
      next(new BadRequestError('bbox must have 4 values'));
    } else {
      const [west, south, east, north] = bboxArray;
      if (isNaN(west) || isNaN(south) || isNaN(east) || isNaN(north)) {
        next(new BadRequestError('bbox must be numeric'));
      } else {
        next();
      }
    }
  } else {
    next(new BadRequestError('bbox must be a comma-separated string'));
  }
}
