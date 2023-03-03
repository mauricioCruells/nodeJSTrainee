import { CreateTagDto } from '../../../movies/dto/create-tag.dto';
import { TagParamDto } from '../../../movies/dto/param.dto';
import { Tag } from '../../entities/tag.entity';

export const tagStub = (): Tag => {
  return {
    tagId: 1,
    genre: 'horror',
    createdAt: new Date('2023-01-06T19:00:12.372Z'),
    updatedAt: new Date('2023-01-06T19:00:12.372Z'),
  };
};

export const newTagInfo = (): CreateTagDto => {
  return {
    genre: 'action',
  };
};

export const tagIdParam = (): TagParamDto => {
  return {
    tagId: 1,
  };
};
