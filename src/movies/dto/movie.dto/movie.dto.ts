
export class MovieDto {
    imdb: ImdbDto
    _id: string
    title: string
    year: number
    director: string
    plot: string
    poster: string
    genres: string[]
}

export class ImdbDto {
    rating: number
    votes: number
}
