import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import 'dotenv/config';
import {MongooseModule} from "@nestjs/mongoose";
import { MoviesModule } from './movies/movies.module';
import {ConfigModule} from "@nestjs/config";
import { UsersModule } from './users/users.module';

@Module({
  imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot(
          process.env.DBURL
      ),
      MoviesModule,
      UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
