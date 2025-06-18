import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      database: 'MyLearning',
      username: 'root',
      password: '123456',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      logging: true,
      options: {
        encrypt: false,
      }
    }),
    ItemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
