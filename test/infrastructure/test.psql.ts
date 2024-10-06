import { PrismaClient } from '@/infrastructure/database/prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

export class TestPrismaClient {
  private static instance: PrismaClient;

  private constructor() {}

  public static async getInstance(): Promise<PrismaClient> {
    if (!TestPrismaClient.instance) {
      const connectionString =
        'postgresql://example_user:example_password@db.psql-prisma.orb.local:5432/example_db';
      console.log(connectionString);
      const pool = new Pool({ connectionString });
      console.log(pool);
      const adapter = new PrismaPg(pool);
      console.log(adapter);

      this.instance = new PrismaClient({ adapter });

      await this.instance.$connect();
    }
    return this.instance;
  }

  public static async closeInstance(): Promise<void> {
    if (this.instance) {
      await this.instance.$disconnect();
      this.instance = null;
    }
  }

  private static async createTables() {}
}
