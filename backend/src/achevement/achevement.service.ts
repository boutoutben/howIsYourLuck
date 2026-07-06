import { Repository } from "typeorm";
import { Achevement } from "./achevement.entity";
import { BaseCrudService } from "../common/base-crud/base-crud.service";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AchevementService extends BaseCrudService<Achevement> {
  constructor(
    @InjectRepository(Achevement)
    repo: Repository<Achevement>,
  ) {
    super(repo, 'achevement_id','achevement_date');
  }
}