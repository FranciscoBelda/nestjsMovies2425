import { IsNotEmpty, IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ImdbDto {
    @IsNumber()
    @IsNotEmpty()
    rating: number;

    @IsNumber()
    @IsNotEmpty()
    votes: number;
}

export class MovieDto {
    @ValidateNested()
    @Type(() => ImdbDto)
    @IsNotEmpty()
    imdb: ImdbDto;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    year: number;

    @IsString()
    @IsNotEmpty()
    director: string;

    @IsString()
    @IsNotEmpty()
    plot: string;

    @IsString()
    @IsNotEmpty()
    poster: string;

    @IsArray()
    @IsString({ each: true })
    genres: string[];
}
