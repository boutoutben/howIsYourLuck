import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from '../common/base-crud/base-crud.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService extends BaseCrudService<User> {
    constructor(
        @InjectRepository(User)
        repo: Repository<User>
    ) {
        super(repo, 'user_id')
    }
}
