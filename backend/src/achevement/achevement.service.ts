import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Achevement } from './achevement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AchevementService {
    constructor(
        @InjectRepository(Achevement)
        private repo: Repository<Achevement>,
    ) {}

    async create(data: Partial<Achevement>) {
        try {
            const achevement = this.repo.create(data);
            const existing = await this.repo.findOne({
                where: { achevement_id: achevement.achevement_id },
            });

            if (existing) {
                throw new ConflictException('Duplicate entry');
            }
            return await this.repo.save(achevement);
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            return await this.repo.find();
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: any) {
        try {
            const achevement = await this.repo.findOne({
            where: { achevement_id: id },
        });

        if (!achevement) {
            throw new NotFoundException('Achevement not found');
        }

        // merge new data
        Object.assign(achevement, data);

        return this.repo.save(achevement);
        } catch (error) {
        throw error;
        }
    }

    async remove(id: number) {
        const result = await this.repo.delete({ achevement_id: id });

        if (result.affected === 0) {
            throw new NotFoundException('Achevement not found');
        }

        return { message: 'Achevement deleted successfully' };
        }
    }
