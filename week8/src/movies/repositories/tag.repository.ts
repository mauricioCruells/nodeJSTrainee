import { ConflictException, Injectable } from '@nestjs/common';
import { Errors } from '../../common';
import { DataSource, Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';

@Injectable()
export class TagRepository extends Repository<Tag> {
  constructor(private dataSource: DataSource) {
    super(Tag, dataSource.createEntityManager());
  }

  async createOneTag(tagInfo: CreateTagDto) {
    try {
      return this.save(tagInfo);
    } catch (error) {
      if (+error.code === Errors.DuplicateError) {
        throw new ConflictException(error.detail);
      } else {
        throw new Error(error);
      }
    }
  }

  async findAllTags(): Promise<Tag[]> {
    return this.find();
  }

  async findOneTag(tagId: number): Promise<Tag> {
    return this.findOne({ where: { tagId } });
  }

  async updateOneTag(tag: Tag, updatedTagInfo: UpdateTagDto) {
    return this.update(tag.tagId, { ...updatedTagInfo });
  }

  async deleteOneTag(tagId: number) {
    return this.delete(tagId);
  }
}
