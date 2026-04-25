import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

describe('ContactController', () => {
  let service: ContactService;
  
    const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
      {
        provide: ContactService,
        useValue: mockService,
      },
    ],
    }).compile();

    controller = module.get<ContactController>(ContactController);
  });

   it('should create a contact', async () => {
    const dto = { name: 'test' };

    mockService.create.mockResolvedValue(dto);

    const result = await controller.create(dto);

    expect(result).toEqual(dto);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all contacts', async () => {
    const data = [{ id: 1 }];

    mockService.findAll.mockResolvedValue(data);

    const result = await controller.findAll();

    expect(result).toEqual(data);
  });

  it('should delete Contact', async () => {
    mockService.remove.mockResolvedValue({
      message: 'Contact deleted successfully',
    });

    const result = await controller.remove('1');

    expect(result).toEqual({
      message: 'Contact deleted successfully',
    });

    expect(mockService.remove).toHaveBeenCalledWith(1);
  });

  it('should update contact', async () => {
    const dto = { contact_name: 'Updated' };

    mockService.update.mockResolvedValue({
      id: 1,
      Contact_name: 'Updated',
    });

    const result = await controller.update('1', dto);

    expect(result).toEqual({
      id: 1,
      Contact_name: 'Updated',
    });

    expect(mockService.update).toHaveBeenCalledWith(1, dto);
  });
});
