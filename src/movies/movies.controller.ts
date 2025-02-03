import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post, Put, Query
} from '@nestjs/common';
import {MovieService} from "./services/movie/movie.service";
import {MovieDto} from "./dto/movie.dto/movie.dto";
import {PaginationDto} from "./dto/pagination.dto/pagination.dto";

@Controller('api/v1/movies')
export class MoviesController {
    constructor(private readonly movieService: MovieService) {
    }

    @Post('')
    async addMovie(@Body() movieDto: MovieDto) {
        try {
            const resp = await this.movieService.addMovie(movieDto);
            return {
                status: 'Ok',
                message: 'Movie Successfully created'
            }
        } catch (e: any) {
            throw new BadRequestException(
                {
                    status: 'Error',
                    message: e.message
                })
        }
    }


    @Get('')
    async getMovies() {
        try {
            const data =
                await this.movieService.getMovies();
            return {
                status: 'Ok',
                data
            }
        } catch (e: any) {
            return new BadRequestException({
                status: 'Error',
                message: e.message
            })
        }
    }


    @Get('paginated')
    async getMoviesPaginated(
        @Query()paginationDto:PaginationDto) {
        try {
            const {page,limit} = paginationDto;
            const data =
                await this.movieService.getMoviesPaginated(
                    page,limit
                );
            return {
                status: 'Ok',
                ...data
            }
        } catch (e: any) {
            return new BadRequestException({
                status: 'Error',
                message: e.message
            })
        }
    }

    @Get('movie/:id')
    async getMovie(@Param('id') id: string) {
        try {
            const data =
                await this.movieService.getMovie(id);
            if (data) {
                return {
                    status: 'Ok',
                    data
                }
            }
            return new NotFoundException({
                status: 'Error',
                message: 'Movie not found'
            })
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }

    @Get('genres')
    async getGenres() {
        try {
            const data =
                await this.movieService.getGenres();

            return {
                status: 'Ok',
                data
            }
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }

    // URLParams = http://www.pepito.com/movies/valor/valor
    // URLQuery = http://www.pepito.com/movies?variable=valor&variable2=valor
    @Get('byName')
    async getMovieByName(@Query('name') name: string) {
        try {
            return await this.movieService.getMovieByName(name);
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }

    @Put('/update/:id')
    async updateMovie(
        @Param('id') id: string,
        @Body() movieDto: MovieDto) {
        try {
            const updatedMovie =
                await this.movieService.updateMovie(
                    id, movieDto
                );
            if (!updatedMovie) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Movie not found'
                })
            }
            return {
                status: 'Ok',
                message: 'Movie updated'
            }
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }

    @Delete('/delete/:id')
    async deleteMovie(@Param('id') id: string) {
        try {
            const deletedMovie =
                await this.movieService.deleteMovie(id);
            if (!deletedMovie) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Movie not found'
                })
            }
            return {
                status: 'Ok',
                message: 'Movie deleted'
            }
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }

}
