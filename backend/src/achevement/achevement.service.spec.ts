import { Test, TestingModule } from '@nestjs/testing';
import { AchevementService } from './achevement.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Achevement } from './achevement.entity';


describe('AchevementService', () => {
  let mockRepo;

  beforeEach(async () => {
    jest.resetAllMocks();

    mockRepo = {
      create: jest.fn((dto) => dto),
      save: jest.fn((entity) => ({ ...entity })),
      findOne: jest.fn(),
      find: jest.fn().mockResolvedValue([
        {
          achevement_id: 1,
          achevement_name: 'Test bbb',
          achevement_date: new Date(),
        },
      ]),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AchevementService,
        {
          provide: getRepositoryToken(Achevement),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get(AchevementService);
  });

  // create

  it('should create an achevement', async () => {
    const achevement = await service.create({
      achevement_id: 1,
      achevement_name: 'Test bbb',
      achevement_date: new Date(),
    });

    expect(achevement.achevement_id).toBeDefined();
  });

 it('should throw when duplicate entry', async () => {
  mockRepo.findOne.mockResolvedValue({
    achevement_id: 1,
    achevement_name: 'Test bbb',
    achevement_date: new Date(),
  });

  await expect(
    service.create({
      achevement_id: 1,
      achevement_name: 'Test bbb',
      achevement_date: new Date(),
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

  it("should find all achevement", async () => {
    const achevements = await service.findAll()
    await expect(achevements).toEqual([
      {
        achevement_id: 1,
        achevement_name: 'Test bbb',
        achevement_date: expect.any(Date),
      },
    ]);
  });

  it("should throw when error", async () => {
    mockRepo.find.mockRejectedValue(new Error("DB error"));
    await expect(service.findAll()).rejects.toThrow("DB error")
  });

  // update

  it("should update the achevement", async () => {
    mockRepo.findOne.mockResolvedValue({
      achevement_id: 1,
      achevement_name: 'Test bbb',
      achevement_date: new Date(),
    });
    const achevement = await service.update(1,{
      achevement_id: 1,
      achevement_name: 'Test bbb update',
      achevement_date: new Date(),
    })
    expect(achevement.achevement_id).toEqual(1);
    expect(achevement.achevement_name).toEqual('Test bbb update')
  });

  it("should throw achevement not found", async () => {
    mockRepo.findOne.mockResolvedValue(null);
    await expect(
      service.update(1, {
        achevement_name: 'Updated',
      }),
    ).rejects.toThrow('Entity not found');
  });

  it("should throw duplicate entry", async () => {
    mockRepo.findOne
      .mockResolvedValueOnce({
        id: 1,
        achevement_id: 1,
      }) // current entity

      .mockResolvedValueOnce({
        id: 2,
        achevement_id: 2,
      }); // duplicate entity

    await expect(
      service.update(1, {
        achevement_id: 2,
      }),
    ).rejects.toThrow('Duplicate entry');
  });

  it("should throw an error", async () => {
    mockRepo.save.mockRejectedValue(new Error("DB error"));
    mockRepo.findOne.mockResolvedValue({
      achevement_id: 1,
      achevement_name: 'Test bbb',
      achevement_date: new Date(),
    });
    await expect(service.update(1, {achevement_id:1})).rejects.toThrow("DB error")
  });

  // Delete

  it("should delete achevement", async () => {
    mockRepo.delete.mockResolvedValue({ affected: 1 });

    const result = await service.remove(1);

    expect(result).toEqual({
      message: 'Deleted successfully',
    });
  });

  it("should throw achevement not found", async () => {
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