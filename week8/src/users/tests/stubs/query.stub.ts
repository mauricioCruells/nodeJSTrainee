import { QueryDto } from '../../../movies/dto/query.dto';

export const query = (): QueryDto => {
  return {
    title: 'something',
    sort: ['likes', '-title'],
    availability: 1,
    tags: ['horror', 'comedy'],
    movies: [1, 2, 3],
  };
};
