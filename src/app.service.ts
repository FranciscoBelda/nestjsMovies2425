import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      "endpoints": [
        {
          "method": "GET",
          "url": "https://backend-movies-amber.vercel.app/api/v1/movies/paginated?page=1&limit=10"
        },
        {
          "method": "POST",
          "url": "https://backend-movies-amber.vercel.app/api/v1/movies"
        },
        {
          "method": "GET",
          "url": "https://backend-movies-amber.vercel.app/api/v1/movies/movie/:id"
        },
        {
          "method": "GET",
          "url": "https://backend-movies-amber.vercel.app/api/v1/movies/byName?name=LOQUEBUSCAS"
        },
        {
          "method": "GET",
          "url": "https://backend-movies-amber.vercel.app/api/v1/movies/genres"
        },
        {
          "method": "UPDATE",
          "url": "https://backend-movies-amber.vercel.app/api/v1/movies/update/:id"
        },
        {
          "method": "DELETE",
          "url": "https://backend-movies-amber.vercel.app/api/v1/movies/delete/:id"
        }
      ]
    };
  }
}
