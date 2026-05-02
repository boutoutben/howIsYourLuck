import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let mockRepo;

  beforeEach(async () => {
    jest.resetAllMocks();

    mockRepo = {
      create: jest.fn((dto) => dto),
      save: jest.fn((entity) => ({ ...entity })),
      findOne: jest.fn(),
      find: jest.fn().mockResolvedValue([
        {
          "user_id": 1,
          "user_lastname": "Morrez-facq",
          "user_firstname":"Juliette",
          "birth_day": "2008-01-08",
          "email": "Juliette@gmail.com",
          "user_password": "test",
          "phone":"0656666769",
          "passions": ["Animaux"],
          "user_score": 1,
          "last_inscrease": null
        },
      ]),
      delete: jest.fn(),
    };
    
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            UserService,
            {
              provide: getRepositoryToken(User),
              useValue: mockRepo,
            },
          ],
        }).compile();
    
        service = module.get(UserService);
  });

  // create

  it('should create an user', async () => {
    const user = await service.create({
      "user_id": 1,
      "user_lastname": "Morrez-facq",
      "user_firstname":"Juliette",
      "birth_day": "2008-01-08",
      "email": "Juliette@gmail.com",
      "user_password": "test",
      "phone":"0656666769",
      "passions": ["Animaux"]
    });

    expect(user.user_id).toBeDefined();
  });

 it('should throw when duplicate entry', async () => {
  mockRepo.findOne.mockResolvedValue({
    "user_id": 1,
    "user_lastname": "Morrez-facq",
    "user_firstname":"Juliette",
    "birth_day": "2008-01-08",
    "email": "Juliette@gmail.com",
    "user_password": "test",
    "phone":"0656666769",
    "passions": ["Animaux"]
  });

  await expect(
    service.create({
      "user_id": 1,
      "user_lastname": "Morrez-facq",
      "user_firstname":"Juliette",
      "birth_day": "2008-01-08",
      "email": "Juliette@gmail.com",
      "user_password": "test",
      "phone":"0656666769",
      "passions": ["Animaux"]
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

  it("should find all user", async () => {
    const users = await service.findAll()
    await expect(users).toEqual([
      {
        "user_id": 1,
        "user_lastname": "Morrez-facq",
        "user_firstname":"Juliette",
        "birth_day": "2008-01-08",
        "email": "Juliette@gmail.com",
        "user_password": "test",
        "phone":"0656666769",
        "passions": ["Animaux"],
        "user_score": 1,
        "last_inscrease": null
      },
    ]);
  });

  it("should throw when error", async () => {
    mockRepo.find.mockRejectedValue(new Error("DB error"));
    await expect(service.findAll()).rejects.toThrow("DB error")
  });

  // update

  it("should update the user", async () => {
    mockRepo.findOne.mockResolvedValue({
      "user_id": 1,
      "user_lastname": "Morrez-facq",
      "user_firstname":"Juliette",
      "birth_day": "2008-01-08",
      "email": "Juliette@gmail.com",
      "user_password": "test",
      "phone":"0656666769",
      "passions": ["Animaux"]
    });
    const user = await service.update(1,{
      "user_id": 1,
      "user_lastname": "Morrez-facq",
      "user_firstname":"Juliette",
      "birth_day": "2008-01-08",
      "email": "Juliette@gmail.com",
      "user_password": "test update",
      "phone":"0656666769",
      "passions": ["Animaux"]
    })
    expect(user.user_id).toEqual(1);
    expect(user.user_password).toEqual('test update')
  });

  it("should throw user not found", async () => {
    mockRepo.findOne.mockResolvedValue(null);
    await expect(
      service.update(1, {
        user_name: 'Updated',
      }),
    ).rejects.toThrow('Entity not found');
  });

  it("should throw duplicate entry", async () => {
    mockRepo.findOne
      .mockResolvedValueOnce({
        id: 1,
        user_id: 1,
      }) // current entity

      .mockResolvedValueOnce({
        id: 2,
        user_id: 2,
      }); // duplicate entity

    await expect(
      service.update(1, {
        user_id: 2,
      }),
    ).rejects.toThrow('Duplicate entry');
  });

  it("should throw an error", async () => {
    mockRepo.save.mockRejectedValue(new Error("DB error"));
    mockRepo.findOne.mockResolvedValue({
      "user_id": 1,
      "user_lastname": "Morrez-facq",
      "user_firstname":"Juliette",
      "birth_day": "2008-01-08",
      "email": "Juliette@gmail.com",
      "user_password": "test",
      "phone":"0656666769",
      "passions": ["Animaux"]
    });
    await expect(service.update(1, {user_id:1})).rejects.toThrow("DB error")
  });

  // Delete

  it("should delete user", async () => {
    mockRepo.delete.mockResolvedValue({ affected: 1 });

    const result = await service.remove(1);

    expect(result).toEqual({
      message: 'Deleted successfully',
    });
  });

  it("should throw user not found", async () => {
    mockRepo.delete.mockResolvedValue({ affected: 0 });

    await expect(service.remove(1)).rejects.toThrow(
      "Entity not found",
    );
  });

  it("should throw an error", async () => {
    mockRepo.delete.mockRejectedValue(new Error("DB error"));

    await expect(service.remove(1)).rejects.toThrow("DB error");
  });

  //update score 

  it("should update the score", async () => {
    const today = new Date();
    const yesterday = today.setDate(today.getDate() - 1)
    mockRepo.findOne.mockResolvedValue({
      "user_id": 1,
      "user_lastname": "Morrez-facq",
      "user_firstname":"Juliette",
      "birth_day": "2008-01-08",
      "email": "Juliette@gmail.com",
      "user_password": "test",
      "phone":"0656666769",
      "passions": ["Animaux"],
      "user_score": 1,
      "last_increase": yesterday
    });


    const result = await service.updateScore(1);

    today.setDate(today.getDate() + 1);

    expect(result.user_score).toEqual(2);
    expect(result.last_increase.getFullYear()).toEqual(today.getFullYear());
    expect(result.last_increase.getMonth()).toEqual(today.getMonth());
    expect(result.last_increase.getDate()).toEqual(today.getDate());
  });

  it("should reset the score", async () => {
     const today = new Date();
    const threeLaster = today.setDate(today.getDate() - 3)
    mockRepo.findOne.mockResolvedValue({
      "user_id": 1,
      "user_lastname": "Morrez-facq",
      "user_firstname":"Juliette",
      "birth_day": "2008-01-08",
      "email": "Juliette@gmail.com",
      "user_password": "test",
      "phone":"0656666769",
      "passions": ["Animaux"],
      "user_score": 5,
      "last_increase": threeLaster
    });


    const result = await service.updateScore(1);

    today.setDate(today.getDate() + 3);

    expect(result.user_score).toEqual(1);
    expect(result.last_increase.getFullYear()).toEqual(today.getFullYear());
    expect(result.last_increase.getMonth()).toEqual(today.getMonth());
    expect(result.last_increase.getDate()).toEqual(today.getDate());
  });
  it("should throw entity not found", async () => {
    mockRepo.findOne(null);
    await expect(service.updateScore(1)).rejects.toThrow("Entity not found");
  });
  
  it("should throw score already update", async () => {
     const today = new Date();
    mockRepo.findOne.mockResolvedValue({
      "user_id": 1,
      "user_lastname": "Morrez-facq",
      "user_firstname":"Juliette",
      "birth_day": "2008-01-08",
      "email": "Juliette@gmail.com",
      "user_password": "test",
      "phone":"0656666769",
      "passions": ["Animaux"],
      "user_score": 5,
      "last_increase": today
    });

    await expect(service.updateScore(1)).rejects.toThrow("Score already update");
  });

  it("should throw error", async () => {
    const today = new Date();
    const yesterday = today.setDate(today.getDate() - 1)
    mockRepo.save.mockRejectedValue(new Error("DB error"));

        mockRepo.findOne.mockResolvedValue({
      "user_id": 1,
      "user_lastname": "Morrez-facq",
      "user_firstname":"Juliette",
      "birth_day": "2008-01-08",
      "email": "Juliette@gmail.com",
      "user_password": "test",
      "phone":"0656666769",
      "passions": ["Animaux"],
      "user_score": 5,
      "last_increase": yesterday
    });

    today.setDate(today.getDate() + 1);

    await expect(service.updateScore(1)).rejects.toThrow("DB error");
  })
});
