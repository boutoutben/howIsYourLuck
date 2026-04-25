import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/base-crud/base-crud.service';
import { Contact } from './contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService extends BaseCrudService<Contact> {
  constructor(
    @InjectRepository(Contact)
    repo: Repository<Contact>,
  ) {
    super(repo, 'contact_id');
  }
}
