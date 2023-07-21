import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  create(createTodoDto: CreateTodoDto) {
    return this.prisma.todoList.create({ data: createTodoDto });
  }

  findAll() {
    return this.prisma.todoList.findMany({});
  }

  findOne(id: string) {
    return this.prisma.todoList.findUnique({ where: { id } });
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.prisma.todoList.update({ where: { id }, data: updateTodoDto });
  }

  remove(id: string) {
    return this.prisma.todoList.delete({ where: { id } });
  }
}
