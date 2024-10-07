import { AppController } from '@/app.controller';
import { afterEach } from 'node:test';
import { DataType, newDb } from 'pg-mem';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  UserRole,
  UserVendor,
} from '@/infrastructure/database/typeorm/entities/user.entity';
import { UserPreference } from '@/infrastructure/database/typeorm/entities/user-preferences.entity';
import { Device } from '@/infrastructure/database/typeorm/entities/device.entity';
import { App } from '@/infrastructure/database/typeorm/entities/app.entity';
import { AppUserProduct } from '@/infrastructure/database/typeorm/entities/app-user-product.entity';
import { UserProduct } from '@/infrastructure/database/typeorm/entities/user-product.entity';
import { Product } from '@/infrastructure/database/typeorm/entities/product.entity';
import { Subscription } from '@/infrastructure/database/typeorm/entities/subscription.entity';

beforeEach(async () => {});

afterEach(async () => {});

afterAll(async () => {});

describe('AppController', () => {
  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const db = newDb({
        autoCreateForeignKeyIndices: true,
      });

      db.public.registerFunction({
        name: 'current_database',
        implementation: () => 'test',
      });

      db.public.registerFunction({
        name: 'version',
        implementation: () => '1',
      });

      db.public.registerFunction({
        name: 'obj_description',
        args: [DataType.text, DataType.text],
        returns: DataType.text,
        implementation: () => 'test',
      });
      db.public.registerFunction({
        name: 'uuid_generate_v4',
        implementation: () => {
          return Math.random().toString(36).substring(2, 15);
        },
      });

      const ds: DataSource = await db.adapters.createTypeormDataSource({
        type: 'postgres',
        entities: [
          User,
          UserPreference,
          Device,
          App,
          AppUserProduct,
          UserProduct,
          Product,
          Subscription,
        ],
      });
      await ds.initialize();
      await ds.synchronize();

      const testModule = await Test.createTestingModule({
        imports: [
          TypeOrmModule.forRoot({
            type: 'postgres',
            entities: [
              __dirname +
                '/infrastructure/database/typeorm/entities/*.entity{.ts,.js}',
            ],
          }),
          AppModule,
        ],
      })
        .overrideProvider(DataSource)
        .useValue(ds)
        .compile();

      const app = testModule.createNestApplication();
      await app.init();

      const userDs = ds.getRepository(User);
      const user = new User(
        UserRole.USER,
        UserVendor.APPLE,
        'hello',
        'hello',
        'hel@lo.com',
        'ko',
        'utc',
        null,
        new Date(),
        new Date(),
      );
      await userDs.save(user);
      const found = await userDs.findOne({ where: { nickname: 'hello' } });
      console.log(found);
    });
  });
});
