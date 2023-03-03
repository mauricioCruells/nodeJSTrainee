import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Project, ProjectDocument } from '../schemas/project.schema';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async findOne(projectFilterQuery: FilterQuery<Project>): Promise<Project> {
    return this.projectModel.findOne(projectFilterQuery);
  }

  async findProjects(
    projectFilterQuery: FilterQuery<Project>,
  ): Promise<Project[]> {
    return this.projectModel.find(projectFilterQuery);
  }

  async createProject(project: Project): Promise<Project> {
    const createdProject = new this.projectModel(project);
    return createdProject.save();
  }

  async findOneAndUpdate(
    projectFilterQuery: FilterQuery<Project>,
    project: UpdateQuery<Project>,
  ): Promise<Project> {
    return this.projectModel.findOneAndUpdate(projectFilterQuery, project);
  }

  async deleteProject(
    projectFilterQuery: FilterQuery<Project>,
  ): Promise<Project> {
    return this.projectModel.findOneAndDelete(projectFilterQuery);
  }
}
