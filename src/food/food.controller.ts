import { Controller, UseGuards, HttpCode, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FoodService } from './food.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';  // Ensure JwtAuthGuard is imported correctly
import { Food } from '../food/food.entity';  // Import the Food entity

@Controller('food')
 // Apply JwtAuthGuard globally to all routes in this controller
export class FoodController {
  constructor(private readonly foodService: FoodService) {}
  @UseGuards(JwtAuthGuard) 
  @Get()
  async findAll(): Promise<Food[]> {
    return this.foodService.findAll();
  }
  @UseGuards(JwtAuthGuard) 
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Food> {
    return this.foodService.findOne(id);
  }
  @UseGuards(JwtAuthGuard) 
  @Post()
  async create(@Body() food: Food): Promise<Food> {
    console.log('Received food data:', food); // Debugging
    return this.foodService.create(food);
  }
  @UseGuards(JwtAuthGuard) 
  @Post('bulk')
  async createBulk(@Body() foods: Food[]) {
    try {
      const createdFoods = await this.foodService.createBulk(foods);
      return createdFoods;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 400,
      };
    }
  }
  
  @UseGuards(JwtAuthGuard) 
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() food: Food,
  ): Promise<Food> {
    return this.foodService.update(id, food);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(200)  // Mengembalikan status HTTP 200 OK
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    const food = await this.foodService.findOne(id);
    if (!food) {
      throw new Error('Food not found');
    }
    
    await this.foodService.delete(id);
    return { message: 'Food successfully deleted' };  // Pesan sukses
  }
}
