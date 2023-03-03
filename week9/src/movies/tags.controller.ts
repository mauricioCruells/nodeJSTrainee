import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/decorator/role.decorator';
import { Role } from '../auth/interfaces/role.enum';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsService } from './tags.service';
import { TagParamDto } from './dto/param.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tags')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({
  path: 'tags',
  version: '1',
})
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createMovieDto: CreateTagDto) {
    return this.tagsService.create(createMovieDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':tagId')
  @Roles(Role.Admin)
  findOne(@Param() tagParam: TagParamDto) {
    return this.tagsService.findOne(+tagParam.tagId);
  }

  @Patch(':tagId')
  @Roles(Role.Admin)
  update(
    @Param() tagParam: TagParamDto,
    @Body() updateMovieDto: UpdateTagDto,
  ) {
    return this.tagsService.update(+tagParam.tagId, updateMovieDto);
  }

  @Delete(':tagId')
  @Roles(Role.Admin)
  remove(@Param() tagParam: TagParamDto) {
    return this.tagsService.remove(+tagParam.tagId);
  }
}
