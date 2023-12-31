import faker from '@faker-js/faker';
import dayjs from 'dayjs';
import { prisma } from '@/config';

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
      updatedAt: dayjs().toDate(),
    },
  });
}

export async function createRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: 6,
      hotelId,
      updatedAt: dayjs().toDate(),
    },
  });
}
