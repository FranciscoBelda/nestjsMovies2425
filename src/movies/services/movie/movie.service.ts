import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Movie} from "../../interfaces/movie/movie.interface";
import {MovieDto} from "../../dto/movie.dto/movie.dto";

@Injectable()
export class MovieService {
    constructor(
        @InjectModel('Movie')
        private movieModel: Model<Movie>) {
    }

    async addMovie(movieDto: MovieDto):Promise<any>{
        const movie = new this.movieModel(movieDto);
        return movie.save();
    }

    async getMovies(): Promise<Movie[]>{
        return this.movieModel.find().exec();
    }
    async getMoviesPaginated(
        page: number,
        limit: number): Promise<any>{
        const skip = (page - 1)*limit;

        const movies = await this.movieModel.find()
            .skip(skip)
            .limit(limit)
            .exec();

        const total =
            await this.movieModel.countDocuments();

        return {
            data:movies,
            info: {
                total,
                pageSize: limit,
                page
            }
        }
    }

    async getMovie(idMovie: string):Promise<Movie>{
        const movie =  await this.movieModel.findById(idMovie).exec();
        if(!movie){
            throw new NotFoundException({
                status: false,
                message: 'Movie not found'
            })
        }
        return movie;
    }

    async getMovieByName(name: string): Promise<Movie[]>{
        const regex = new RegExp(name,'i');
        return this.movieModel.find(
            {title: {$regex: regex}}
        )
    }

    async updateMovie(id:string,movieDto: MovieDto):Promise<any>{
        const updatedMovie = await this.movieModel.findByIdAndUpdate(
            id,
            {$set: movieDto},
            {new: true}
        ).exec();
        if (!updatedMovie) {
            throw new NotFoundException({
                status: false,
                message: 'Movie not found'
            })
        }
        return updatedMovie;
    }
    async patchMovie(id: string, partialMovieDto: Partial<MovieDto>): Promise<Movie | null> {
        const patchedMovie = await this.movieModel.findByIdAndUpdate(
          id,
          { $set: partialMovieDto },
          { new: true },
        ).exec();
        if (!patchedMovie) {
            throw new NotFoundException({ status: false, message: 'Movie not found' });
        }
        return patchedMovie;
    }

    async deleteMovie(idMovie: string): Promise<any>{
        const deletedMovie = await this.movieModel.findByIdAndDelete(idMovie).exec();
        if (!deletedMovie) {
            throw new NotFoundException({ status: false, message: 'Movie not found' });
        }
        return deletedMovie;
    }

    async getGenres():Promise<string[]>{
        return this.movieModel.find().distinct('genres').exec();
    }

}
