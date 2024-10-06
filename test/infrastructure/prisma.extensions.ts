import { PrismaClient } from '@/infrastructure/database/prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

export class TestPrismaClient extends PrismaClient {
  constructor(adapter: PrismaPg) {
    super({ adapter });
    this.$connect();
  }

  public async clear() {
    await this.user.deleteMany();
  }

  public async close() {
    await this.clear();
    this.$disconnect();
  }
}

export {};
