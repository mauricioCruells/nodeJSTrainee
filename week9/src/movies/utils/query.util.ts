import { Like, MoreThanOrEqual } from 'typeorm';

export function parseSortParams(sortParams: string[]) {
  if (sortParams) {
    return sortParams.reduce((paramObject, param) => {
      let field = param;
      let order = 'ASC';

      if (param[0] === '-') {
        field = param.slice(1);
        order = 'DESC';
      }

      return {
        ...paramObject,
        [field]: order,
      };
    }, {});
  } else {
    return { title: 'ASC' };
  }
}

export function parseFilterParams(filters) {
  const filterOptions = [];
  let singleOption = {};

  const { title, availability, tags, movies } = filters;

  if (title) {
    singleOption = { ...singleOption, title: Like(`%${title}%`) };
  }

  if (availability !== undefined) {
    singleOption = {
      ...singleOption,
      availability: MoreThanOrEqual(availability),
    };
  } else {
    singleOption = {
      ...singleOption,
      availability: MoreThanOrEqual(1),
    };
  }

  if (tags) {
    tags.forEach((tag) => {
      filterOptions.push({ ...singleOption, tags: { genre: tag } });
    });
  }

  //only for renting movies, if passed on /movies endpoint it won't work
  if (movies) {
    //requested movies
    movies.forEach((movieId) => {
      filterOptions.push({ ...singleOption, movieId });
    });
  } else {
    filterOptions.push(singleOption);
  }

  return filterOptions;
}
