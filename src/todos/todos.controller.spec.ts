import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import {
  createTodoDTO,
  createTodoResponceDTO,
  userData,
} from './__test__/mock-data';

const todosServiceMock = {
  create: jest.fn(),
  update: jest.fn(),
  updateStatus: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
};

// const mockPrismaOrm = {
//       todoList: {
//         create: jest.fn(),
//         findFirstOrThrow: jest.fn(),
//         count: jest.fn(),
//         findMany: jest.fn(),
//         update: jest.fn(),
//         delete: jest.fn(),
//       },
//   };

describe('TodosController', () => {
  let controller: TodosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [{ provide: TodosService, useValue: todosServiceMock }]
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create method in controller', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it('should create a todo and return created data', async () => {
      const data = createTodoDTO;

      todosServiceMock.create.mockReturnValue({
        status_code: 201,
        data: {
          todo: createTodoResponceDTO,
        },
      });

      const result = controller.create(data, { user: userData });

      expect(result).toEqual({
        status_code: 201,
        data: {
          todo: createTodoResponceDTO,
        },
      });
    });

    it('should return a error message and status_code if service fails to create todo', async () => {
      const data = createTodoDTO;

      todosServiceMock.create.mockReturnValue({
        status_code: 400,
        message: 'Failed to create todo',
      });

      const result = controller.create(data, { user: userData });

      expect(result).toEqual({
        status_code: 400,
        message: 'Failed to create todo',
      });
    });
  });
});
