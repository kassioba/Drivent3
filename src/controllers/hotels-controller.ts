import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { getAllHotels } from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    res.send(await getAllHotels(userId));
  } catch (err) {
    if (err.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(err.message);
    if (err.name === 'paymentRequiredError') return res.status(httpStatus.PAYMENT_REQUIRED).send(err.message);

    res.status(httpStatus.BAD_REQUEST).send(err.message);
  }
}
