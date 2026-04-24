import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlanningService } from './planning.service';
import { Planning } from './planning.entity';



describe('PlanningService', () => {
let mockRepo;

beforeEach(async () => {
  jest.resetAllMocks();

  mockRepo = {
    create: jest.fn((dto) => dto),
    save: jest.fn((entity) => ({ ...entity })),
    findOne: jest.fn(),
    find: jest.fn().mockResolvedValue([
      {
        planning_id: 1,
        planning_name: 'Test bbb',
        planning_date: new Date(),
      },
    ]),
    delete: jest.fn(),
  };

  const module: TestingModule = await Test.createTestingModule({
    providers: [
      PlanningService,
      {
        provide: getRepositoryToken(Planning),
        useValue: mockRepo,
      },
    ],
  }).compile();

  service = module.get(PlanningService);
});

  // create

  it('should create an planning', async () => {
    const planning = await service.create({
      planning_id: 1,
      planning_name: 'Test bbb',
      planning_date: new Date(),
    });

    expect(planning.planning_id).toBeDefined();
  });

 it('should throw when duplicate entry', async () => {
  mockRepo.findOne.mockResolvedValue({
    planning_id: 1,
    planning_name: 'Test bbb',
    planning_date: new Date(),
  });

  await expect(
    service.create({
      planning_id: 1,
      planning_name: 'Test bbb',
      planning_date: new Date(),
    })
  ).rejects.toThrow('Duplicate entry');
});

  it('should throw when save fails', async () => {
    mockRepo.save.mockRejectedValue(new Error('DB error'));

    await expect(service.create({ name: 'test' }))
      .rejects
      .toThrow('DB error');
  });

  // findAll 

  it("should find all planning", async () => {
    const plannings = await service.findAll()
    await expect(plannings).toEqual([
      {
        planning_id: 1,
        planning_name: 'Test bbb',
        planning_date: expect.any(Date),
      },
    ]);
  });

  it("should throw when error", async () => {
    mockRepo.find.mockRejectedValue(new Error("DB error"));
    await expect(service.findAll()).rejects.toThrow("DB error")
  });

  // update

  it("should update the planning", async () => {
    mockRepo.findOne.mockResolvedValue({
      planning_id: 1,
      planning_name: 'Test bbb',
      planning_date: new Date(),
    });
    const planning = await service.update(1,{
      planning_id: 1,
      planning_name: 'Test bbb update',
      planning_date: new Date(),
    })
    expect(planning.planning_id).toEqual(1);
    expect(planning.planning_name).toEqual('Test bbb update')
  });

  it("should throw planning not found", async () => {
    mockRepo.findOne.mockResolvedValue(null);
    await expect(
      service.update(1, {
        planning_name: 'Updated',
      }),
    ).rejects.toThrow('Entity not found');
  });

  it("should throw duplicate entry", async () => {
    mockRepo.findOne
      .mockResolvedValueOnce({
        id: 1,
        planning_id: 1,
      }) // current entity

      .mockResolvedValueOnce({
        id: 2,
        planning_id: 2,
      }); // duplicate entity

    await expect(
      service.update(1, {
        planning_id: 2,
      }),
    ).rejects.toThrow('Duplicate entry');
  });

  it("should throw an error", async () => {
    mockRepo.save.mockRejectedValue(new Error("DB error"));
    mockRepo.findOne.mockResolvedValue({
      planning_id: 1,
      planning_name: 'Test bbb',
      planning_date: new Date(),
    });
    await expect(service.update(1, {planning_id:1})).rejects.toThrow("DB error")
  });

  // Delete

  it("should delete planning", async () => {
    mockRepo.delete.mockResolvedValue({ affected: 1 });

    const result = await service.remove(1);

    expect(result).toEqual({
      message: 'Deleted successfully',
    });
  });

  it("should throw planning not found", async () => {
    mockRepo.delete.mockResolvedValue({ affected: 0 });

    await expect(service.remove(1)).rejects.toThrow(
      "Entity not found",
    );
  });

  it("should throw an error", async () => {
    mockRepo.delete.mockRejectedValue(new Error("DB error"));

    await expect(service.remove(1)).rejects.toThrow("DB error");
  })

});