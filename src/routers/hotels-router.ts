import Router from 'express';
import { getHotelAndRoomsById, getHotels } from '@/controllers/hotels-controller';
import { authenticateToken } from '@/middlewares';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('/', getHotels).get('/:hotelId', getHotelAndRoomsById);

export { hotelsRouter };
