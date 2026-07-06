import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from '../common/base-crud/base-crud.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';

function isSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

@Injectable()
export class UserService extends BaseCrudService<User> {
    constructor(
        @InjectRepository(User)
        repo: Repository<User>
    ) {
        super(repo, 'user_id','')
    }

    async updateScore(id: number) {
        try {
            const user = await this.repo.findOne({
                where: { user_id: id } as any,
            });

            if (!user) {
                throw new NotFoundException('Entity not found');
            };
            const today = new Date();

            
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            let isYesterday = false;
            let isToday = false;
            if(user.last_increase != null) {
                const last = new Date(user.last_increase);
                isToday = isSameDay(last,today);

                if(isToday) {
                    throw new Error('Score already update');
                }
                isYesterday = isSameDay(last, yesterday)
            }


            if (isYesterday) {
                user.user_score += 1;
            }
            else {
                user.user_score = 1;
            }
            user.last_increase = new Date(); 
            await this.repo.save(user);  
            return user;
        } catch(error) {
            throw error;
        }

    }
}
