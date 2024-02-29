import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import {
  createTodoDTO,
  createTodoResponceDTO,
  userData,
} from './__test__/mock-data';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

const todosServiceMock = {
  create: jest.fn(),
  update: jest.fn(),
  updateStatus: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
};

const mockPrismaOrm = {
      todoList: {
        create: jest.fn(),
        findFirstOrThrow: jest.fn(),
        count: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    //   $transaction: jest.fn(),
    // org: {
    //   orgUser: {
    //     findFirst: jest.fn(),
    //   },
    //   $transaction: jest.fn(),
    // },
  };

describe('TodosController', () => {
  let controller: TodosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [{ provide: TodosService, useValue: todosServiceMock }],
      imports: [PrismaService]
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

    // it('should create a todo and return created data', async () => {
    //   const data = createTodoDTO;

    //   todosServiceMock.create.mockReturnValue({
    //     status_code: 201,
    //     data: {
    //       todo: createTodoResponceDTO,
    //     },
    //   });

    //   const result = controller.create(data, { user: userData });

    //   expect(result).toEqual({
    //     status_code: 201,
    //     data: {
    //       todo: createTodoResponceDTO,
    //     },
    //   });
    // });

    // it('should return a error message and status_code if service fails to create todo', async () => {
    //   const data = createTodoDTO;

    //   todosServiceMock.create.mockReturnValue({
    //     status_code: 400,
    //     message: 'Failed to create todo',
    //   });

    //   const result = controller.create(data, { user: userData });

    //   expect(result).toEqual({
    //     status_code: 400,
    //     message: 'Failed to create todo',
    //   });
    // });
  });
});
