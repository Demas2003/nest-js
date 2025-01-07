// food.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './food.entity';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Food])],
  providers: [FoodService],
  exports: [FoodService],  // Pastikan FoodService diekspor di sini
  controllers: [FoodController],
})
export class FoodModule {}
