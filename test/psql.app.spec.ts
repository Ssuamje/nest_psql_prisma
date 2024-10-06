import { AppController } from '@/app.controller';
import { TestPrismaClientFactory } from '@test/infrastructure/test.psql';
import { afterEach } from 'node:test';
import { TestPrismaClient } from '@test/infrastructure/prisma.extensions';

let prisma: TestPrismaClient;

beforeEach(async () => {
  prisma = await TestPrismaClientFactory.get();
  await prisma.clear();
});

afterEach(async () => {});

afterAll(async () => {});

describe('AppController', () => {
  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'sanan@naver.com',
          name: 'sanan',
        },
      });

      const findUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      expect(findUser).toEqual(user);
    });
  });
});
