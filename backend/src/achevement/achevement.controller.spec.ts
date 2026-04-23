import { Test, TestingModule } from '@nestjs/testing';
import { AchevementService } from './achevement.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Achevement } from './achevement.entity';


describe('AchevementService', () => {
  let service: AchevementService;

  const mockRepo = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((entity) => ({
      ...entity,
      achevement_id: 1,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AchevementService,
        {
          provide: getRepositoryToken(Achevement),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<AchevementService>(AchevementService);
  });

  it('should create an achevement', async () => {
    const achevement = await service.create({
      achevement_name: 'Test bbb',
      achevement_date: new Date(),
    });

    expect(achevement.achevement_id).toBeDefined();
  });
});