import { notFoundError, paymentRequiredError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { selectHotelByIdWithRooms, selectHotels } from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';

export async function getAllHotels(userId: number) {
  const enrollment = await enrollmentRepository.findByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) throw notFoundError();

  const hotels = await selectHotels();

  if (!hotels[0]) throw notFoundError();

  if (ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel)
    throw paymentRequiredError();

  return hotels;
}

export async function getHotelById(hotelId: number, userId: number) {
  const enrollment = await enrollmentRepository.findByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) throw notFoundError();

  const hotel = await selectHotelByIdWithRooms(hotelId);

  if (!hotel) throw notFoundError();

  if (ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel)
    throw paymentRequiredError();

  return hotel;
}
