import { BaseCrudService } from "../common/base-crud/base-crud.service";
import { Planning } from "./planning.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";

@Injectable()
export class PlanningService extends BaseCrudService<Planning> {
  constructor(
    @InjectRepository(Planning)
    repo: Repository<Planning>,
  ) {
    super(repo, 'planning_id','');
  }

  async check(id:number) {
    try {
      const entity = await this.repo.findOne({
          where: { [this.idField]: id } as any,
        });
      
        if (!entity) {
          throw new NotFoundException('Entity not found');
        }

        Object.assign(entity, {planning_check: true})
          
        return this.repo.save(entity);
    } catch (error) {
      throw error;
    }
  }

  async findByDate(date: Date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return this.repo.find({
    where: {
      planning_date: Between(start, end),
    } as any,
  });
}
}