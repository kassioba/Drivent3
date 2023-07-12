import { prisma } from '@/config';

export async function selectHotels() {
  return prisma.hotel.findMany();
}
