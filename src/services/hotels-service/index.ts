import { notFoundError, paymentRequiredError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { selectHotels } from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';

export async function getAllHotels(userId: number) {
  const enrollment = await enrollmentRepository.findByUserId(userId);

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  const hotels = await selectHotels();

  if (!enrollment || !ticket || !hotels) throw notFoundError();

  if (ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel)
    throw paymentRequiredError();

  return hotels;
}
