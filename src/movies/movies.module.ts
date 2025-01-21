import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MovieService } from './services/movie/movie.service';
import {MongooseModule} from "@nestjs/mongoose";
import {MovieSchema} from "./schemas/movie.schema/movie.schema";

@Module({
  imports: [
      MongooseModule.forFeature(
          [
            {
              name: 'Movie',
              schema: MovieSchema,
              collection: 'movies2425'
            }
          ]
      )
  ],
  controllers: [MoviesController],
  providers: [MovieService]
})
export class MoviesModule {}
