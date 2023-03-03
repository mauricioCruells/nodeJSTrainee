import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagRepository } from './repositories/tag.repository';

@Injectable()
export class TagsService {
  constructor(private tagRepository: TagRepository) {}

  async create(newMovieInfo: CreateTagDto) {
    return this.tagRepository.createOneTag(newMovieInfo);
  }

  async findAll() {
    return this.tagRepository.findAllTags();
  }

  async findOne(tagId: number) {
    const tag = await this.tagRepository.findOneTag(tagId);

    if (!tag) {
      throw new NotFoundException(`tag with id: ${tagId} not found`);
    }

    return tag;
  }

  async update(tagId: number, updatedMovieInfo: UpdateTagDto) {
    const tag = await this.findOne(tagId);

    await this.tagRepository.updateOneTag(tag, updatedMovieInfo);

    return { tagId: tag.tagId, ...updatedMovieInfo };
  }

  async remove(tagId: number) {
    const deletedTag = await this.tagRepository.deleteOneTag(tagId);

    if (deletedTag.affected === 0) {
      throw new NotFoundException(`tag with id: ${tagId} not found`);
    }
  }
}
