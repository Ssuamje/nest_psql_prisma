import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db.nest-psql-prisma.orb.local',
      port: 5432,
      username: 'example_user',
      password: 'example_password',
      database: 'example_db',
      entities: [
        __dirname +
          '/infrastructure/database/typeorm/entities/*.entity{.ts,.js}',
      ],
      synchronize: process.env.NODE_ENV === 'development',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
