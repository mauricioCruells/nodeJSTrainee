import { Test, TestingModule } from '@nestjs/testing';
import { Tag } from '../entities/tag.entity';
import { TagsController } from '../tags.controller';
import { TagsService } from '../tags.service';
import { newTagInfo, tagIdParam, tagStub } from './stubs/tags.stub';

jest.mock('../tags.service');

describe('TagsController', () => {
  let tagsController: TagsController;
  let tagsService: TagsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [TagsService],
    }).compile();

    tagsController = module.get<TagsController>(TagsController);
    tagsService = module.get<TagsService>(TagsService);
  });

  test('module should be defined', () => {
    expect(tagsController).toBeDefined();
    expect(tagsService).toBeDefined();
  });

  describe('given findAll()', () => {
    describe('when called without params', () => {
      let tags: Tag[];

      beforeEach(async () => {
        tags = await tagsController.findAll();
      });

      test('then it should call tagssService.findAll', () => {
        expect(tagsService.findAll).toBeCalled();
      });

      test('then it should return an array of tags', () => {
        expect(tags).toEqual([tagStub()]);
      });
    });
  });

  describe('given create()', () => {
    describe('when called with new tag info', () => {
      let tag: Tag;
      beforeEach(async () => {
        tag = await tagsController.create(newTagInfo());
      });

      test('then it should call tagsService.create', () => {
        expect(tagsService.create).toBeCalled();
      });

      test('then it should return created tag', () => {
        expect(tag).toEqual(tagStub());
      });
    });
  });

  describe('given findOne()', () => {
    describe('when called with tagId', () => {
      let tag: Tag;
      beforeEach(async () => {
        tag = await tagsController.findOne(tagIdParam());
      });

      test('then it should call tagsService.findOne', () => {
        expect(tagsService.findOne).toBeCalled;
      });

      test('then it should return tag', () => {
        expect(tag).toEqual(tagStub());
      });
    });
  });

  describe('given update()', () => {
    describe('when called with tagId and new info', () => {
      let tag;
      beforeEach(async () => {
        tag = await tagsController.update(tagIdParam(), tagStub());
      });

      test('then it should call tagssService.update', () => {
        expect(tagsService.update).toBeCalled;
      });

      test('then it should return tag', () => {
        expect(tag).toEqual(tagStub());
      });
    });
  });

  describe('given remove()', () => {
    describe('when called with tagid', () => {
      beforeEach(async () => {
        await tagsController.remove(tagIdParam());
      });

      test('then it should call tagsService.remove', () => {
        expect(tagsService.remove).toBeCalled();
      });
    });
  });
});
