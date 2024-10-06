import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { TestPrismaClient } from '@test/infrastructure/prisma.extensions';

export class TestPrismaClientFactory {
  private constructor() {}

  public static async get(): Promise<TestPrismaClient> {
    const connectionString =
      'postgresql://example_user:example_password@db.psql-prisma.orb.local:5432/example_db';
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    return new TestPrismaClient(adapter);
  }
}
