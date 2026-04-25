import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Contact } from './contact.entity';

describe('ContactService', () => {
  let mockRepo;
  
  beforeEach(async () => {
    jest.resetAllMocks();
  
    mockRepo = {
      create: jest.fn((dto) => dto),
      save: jest.fn((entity) => ({ ...entity })),
      findOne: jest.fn(),
      find: jest.fn().mockResolvedValue([
        {
          contact_id: 1,
          contact_name: 'Test bbb',
          contact_role: "test",
          contact_img: "test.jpg"
        },
      ]),
      delete: jest.fn(),
    };
  
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: getRepositoryToken(Contact),
          useValue: mockRepo,
        },
      ],
    }).compile();
  
    service = module.get(ContactService);
  });

  
  // create

  it('should create an contact', async () => {
    const contact = await service.create({
      contact_id: 1,
      contact_name: 'Test bbb',
      contact_role: "test",
      contact_img: "test.jpg"
    });

    expect(contact.contact_id).toBeDefined();
  });

 it('should throw when duplicate entry', async () => {
  mockRepo.findOne.mockResolvedValue({
    contact_id: 1,
    contact_name: 'Test bbb',
    contact_role: "test",
    contact_img: "test.jpg"
  });

  await expect(
    service.create({
        contact_id: 1,
        contact_name: 'Test bbb',
        contact_role: "test",
        contact_img: "test.jpg"
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

  it("should find all contact", async () => {
    const achevements = await service.findAll()
    await expect(achevements).toEqual([
      {
          contact_id: 1,
          contact_name: 'Test bbb',
          contact_role: "test",
          contact_img: "test.jpg"
      },
    ]);
  });

  it("should throw when error", async () => {
    mockRepo.find.mockRejectedValue(new Error("DB error"));
    await expect(service.findAll()).rejects.toThrow("DB error")
  });

  // update

  it("should update the contact", async () => {
    mockRepo.findOne.mockResolvedValue({
        contact_id: 1,
        contact_name: 'Test bbb',
        contact_role: "test",
        contact_img: "test.jpg"
    });
    const contact = await service.update(1,{
          contact_id: 1,
          contact_name: 'Test bbb update',
          contact_role: "test",
          contact_img: "test.jpg"
    })
    expect(contact.contact_id).toEqual(1);
    expect(contact.contact_name).toEqual('Test bbb update')
  });

  it("should throw contact not found", async () => {
    mockRepo.findOne.mockResolvedValue(null);
    await expect(
      service.update(1, {
        contact_name: 'Updated',
      }),
    ).rejects.toThrow('Entity not found');
  });

  it("should throw duplicate entry", async () => {
    mockRepo.findOne
      .mockResolvedValueOnce({
        id: 1,
        contact_id: 1,
      }) // current entity

      .mockResolvedValueOnce({
        id: 2,
        contact_id: 2,
      }); // duplicate entity

    await expect(
      service.update(1, {
        contact_id: 2,
      }),
    ).rejects.toThrow('Duplicate entry');
  });

  it("should throw an error", async () => {
    mockRepo.save.mockRejectedValue(new Error("DB error"));
    mockRepo.findOne.mockResolvedValue({
      contact_id: 1,
      contact_name: 'Test bbb',
      contact_role: "test",
      contact_img: "test.jpg"
    });
    await expect(service.update(1, {contact_id:1})).rejects.toThrow("DB error")
  });

  // Delete

  it("should delete contact", async () => {
    mockRepo.delete.mockResolvedValue({ affected: 1 });

    const result = await service.remove(1);

    expect(result).toEqual({
      message: 'Deleted successfully',
    });
  });

  it("should throw contact not found", async () => {
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
