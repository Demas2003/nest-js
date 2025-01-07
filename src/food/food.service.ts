import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from '../food/food.entity';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
  ) {}

  async findAll(): Promise<Food[]> {
    return this.foodRepository.find();
  }

  async findOne(id: number): Promise<Food> {
    return this.foodRepository.findOneBy({ id });
  }

  async create(food: Partial<Food>): Promise<Food> {
    const newFood = this.foodRepository.create(food);
    return this.foodRepository.save(newFood);
  }

  async update(id: number, food: Partial<Food>): Promise<Food> {
    await this.foodRepository.update(id, food);
    return this.foodRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.foodRepository.delete(id);
  }
}
