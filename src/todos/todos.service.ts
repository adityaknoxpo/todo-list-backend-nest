import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto, userId: string) {
    try {
      const todo = await this.prisma.todoList.create({
        data: {
          title: createTodoDto.title,
          description: createTodoDto.description,
          userId,
        },
      });
      return {
        status_code: 201,
        data: {
          todo
        }
      }
      
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Failed to create todo',
      });
    }
  }

  findAll(userId: string) {
    return this.prisma.todoList.findMany({ where: { userId } });
  }

  async findOne(id: string, userId: string) {
    try {
      const todo = await this.prisma.todoList.findFirst({
        where: { id, userId },
      });
      if (!todo) {
        return new NotFoundException();
      }
      return todo;
    } catch (error) {
      return new NotFoundException();
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, userId: string) {
    try {
      const todo = await this.prisma.todoList.findFirst({
        where: { id, userId },
      });
      if (!todo) {
        return new NotFoundException();
      }
      return this.prisma.todoList.update({
        where: { id },
        data: updateTodoDto,
      });
    } catch (error) {
      return new NotFoundException();
    }
  }

  async updateStatus(id: string, userId: string) {
    try {
      const todo = await this.prisma.todoList.findFirst({
        where: { id, userId },
      });
      if (!todo) {
        return new NotFoundException();
      }
      return this.prisma.todoList.update({
        where: { id },
        data: { completed: !todo.completed },
      });
    } catch (error) {
      return new NotFoundException();
    }
  }

  async remove(id: string, userId: string) {
    try {
      const todo = await this.prisma.todoList.findFirst({
        where: { id, userId },
      });
      if (!todo) {
        return new NotFoundException();
      }
      return this.prisma.todoList.delete({ where: { id } });
    } catch (error) {
      return new NotFoundException();
    }
  }
}
