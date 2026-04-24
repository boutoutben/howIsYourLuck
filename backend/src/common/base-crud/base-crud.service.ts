import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

export class BaseCrudService<T extends ObjectLiteral> {
  constructor(
    protected readonly repo: Repository<T>,
    protected readonly idField: keyof T,
  ) {}

  async create(data: DeepPartial<T>) {
  const entity = this.repo.create(data);

  const idValue = (entity as any)[this.idField];

  if (idValue) {
    const existing = await this.repo.findOne({
      where: { [this.idField]: idValue } as any,
    });

    if (existing) {
      throw new ConflictException('Duplicate entry');
    }
  }

  return this.repo.save(entity);
}

  async findAll() {
    return this.repo.find();
  }

  async update(id: number, data: Partial<T>) {
    const entity = await this.repo.findOne({
      where: { [this.idField]: id } as any,
    });

    if (!entity) {
      throw new NotFoundException('Entity not found');
    }

    if (data[this.idField]) {
      const existing = await this.repo.findOne({
        where: { [this.idField]: data[this.idField] } as any,
      });

      if (
        existing &&
        existing[this.idField] !== entity[this.idField]
      ) {
        throw new ConflictException('Duplicate entry');
      }
    }

    Object.assign(entity, data);

    return this.repo.save(entity);
  }

  async remove(id: number) {
    const result = await this.repo.delete({
      [this.idField]: id,
    } as any);

    if (result.affected === 0) {
      throw new NotFoundException('Entity not found');
    }

    return { message: 'Deleted successfully' };
  }
}