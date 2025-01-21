import { Injectable } from '@nestjs/common';
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
        return this.movieModel.find();
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
        return this.movieModel.findById(idMovie);
    }

    async getMovieByName(name: string): Promise<Movie[]>{
        const regex = new RegExp(name,'i');
        return this.movieModel.find(
            {title: {$regex: regex}}
        )
    }

    async updateMovie(id:string,movieDto: MovieDto):Promise<any>{
        return this.movieModel.findByIdAndUpdate(
            id,
            {$set: movieDto},
            {new: true}
        )
    }

    async deleteMovie(idMovie: string): Promise<any>{
        return this.movieModel.findByIdAndDelete(idMovie);
    }

    async getGenres():Promise<string[]>{
        return this.movieModel.find().distinct('genres');
    }

}
