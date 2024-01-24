import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Put,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TodoListEntity } from './entities/todo.entity';
import { RequestType } from 'src/users/dto/user.dto';

@Controller('todos')
@ApiTags('TodoList')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiCreatedResponse({ type: TodoListEntity })
  create(@Body() createTodoDto: CreateTodoDto, @Request() req: RequestType) {
    return this.todosService.create(createTodoDto, req.user.id);
  }

  @Get()
  @ApiOkResponse({ type: TodoListEntity, isArray: true })
  findAll(@Request() req: RequestType) {
    return this.todosService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOkResponse({ type: TodoListEntity })
  findOne(@Param('id') id: string, @Request() req: RequestType) {
    return this.todosService.findOne(id, req.user.id);
  }

  @Put(':id')
  @ApiOkResponse({ type: TodoListEntity })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @Request() req: RequestType) {
    return this.todosService.update(id, updateTodoDto, req.user.id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TodoListEntity })
  updateStatus(@Param('id') id: string, @Request() req: RequestType) {
    return this.todosService.updateStatus(id, req.user.id);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TodoListEntity })
  remove(@Param('id') id: string, @Request() req: RequestType) {
    return this.todosService.remove(id, req.user.id);
  }
}
