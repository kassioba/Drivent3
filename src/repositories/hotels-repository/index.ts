import { prisma } from '@/config';

export async function selectHotels() {
  return prisma.hotel.findMany();
}

export async function selectHotelByIdWithRooms(hotelId: number) {
  return prisma.hotel.findUnique({
    where: { id: hotelId },
    include: { Rooms: true },
  });
}
