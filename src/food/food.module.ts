// food.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './food.entity';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { Category } from './category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Food , Category])],
  providers: [FoodService],
  exports: [FoodService],  // Pastikan FoodService diekspor di sini
  controllers: [FoodController],
})
export class FoodModule {}
