import { BaseCrudService } from "../common/base-crud/base-crud.service";
import { Planning } from "./planning.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PlanningService extends BaseCrudService<Planning> {
  constructor(
    @InjectRepository(Planning)
    repo: Repository<Planning>,
  ) {
    super(repo, 'planning_id');
  }
}