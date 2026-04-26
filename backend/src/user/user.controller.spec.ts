import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserController', () => {
  let service: UserService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(UserController);
  });

  it('should create an user', async () => {
    const dto = { name: 'test' };

    mockService.create.mockResolvedValue(dto);

    const result = await controller.create(dto);

    expect(result).toEqual(dto);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all user', async () => {
    const data = [{ id: 1 }];

    mockService.findAll.mockResolvedValue(data);

    const result = await controller.findAll();

    expect(result).toEqual(data);
  });

  it('should delete user', async () => {
    mockService.remove.mockResolvedValue({
      message: 'Deleted successfully',
    });

    const result = await controller.remove('1');

    expect(result).toEqual({
      message: 'Deleted successfully',
    });

    expect(mockService.remove).toHaveBeenCalledWith(1);
  });

  it('should update user', async () => {
    const dto = { user_name: 'Updated' };

    mockService.update.mockResolvedValue({
      id: 1,
      user_name: 'Updated',
    });

    const result = await controller.update('1', dto);

    expect(result).toEqual({
      id: 1,
      user_name: 'Updated',
    });

    expect(mockService.update).toHaveBeenCalledWith(1, dto);
});
});
