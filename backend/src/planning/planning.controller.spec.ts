import { Test, TestingModule } from '@nestjs/testing';
import { PlanningController } from './planning.controller';
import { PlanningService } from './planning.service';

describe('PlanningController', () => {
  let controller: PlanningController;
  let mockService: any;

  beforeEach(async () => {
    mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      check: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanningController],
      providers: [
        {
          provide: PlanningService,
          useValue: mockService, // 🔥 THIS FIXES EVERYTHING
        },
      ],
    }).compile();

    controller = module.get<PlanningController>(PlanningController);
  });

   it('should create an planning', async () => {
    const dto = { name: 'test' };

    mockService.create.mockResolvedValue(dto);

    const result = await controller.create(dto);

    expect(result).toEqual(dto);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all achevements', async () => {
    const data = [{ id: 1 }];

    mockService.findAll.mockResolvedValue(data);

    const result = await controller.findAll();

    expect(result).toEqual(data);
  });

  it('should delete planning', async () => {
    mockService.remove.mockResolvedValue({
      message: 'Deleted successfully',
    });

    const result = await controller.remove('1');

    expect(result).toEqual({
      message: 'Deleted successfully',
    });

    expect(mockService.remove).toHaveBeenCalledWith(1);
  });

  it('should update planning', async () => {
    const dto = { planning_name: 'Updated' };

    mockService.update.mockResolvedValue({
      id: 1,
      planning_name: 'Updated',
    });

    const result = await controller.update('1', dto);

    expect(result).toEqual({
      id: 1,
      planning_name: 'Updated',
    });

    expect(mockService.update).toHaveBeenCalledWith(1, dto);
  });

  it("should check planning", async () => {
    mockService.check.mockResolvedValue({
      planning_id: 1,
      planning_check: true,
    });

    const result = await controller.check("1");

    expect(mockService.check).toHaveBeenCalledWith(1); // ✅ important
    expect(result).toEqual({
      planning_id: 1,
      planning_check: true,
    });
  });
});
