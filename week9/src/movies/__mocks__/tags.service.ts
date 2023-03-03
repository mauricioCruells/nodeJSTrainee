import { tagStub } from '../tests/stubs/tags.stub';

export const TagsService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([tagStub()]),
  create: jest.fn().mockResolvedValue(tagStub()),
  findOne: jest.fn().mockResolvedValue(tagStub()),
  update: jest.fn().mockResolvedValue(tagStub()),
  remove: jest.fn().mockResolvedValue(null),
});
