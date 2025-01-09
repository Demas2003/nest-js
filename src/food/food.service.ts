import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from '../food/food.entity';
import { Category } from './category.entity';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Food[]> {
    return this.foodRepository.find({relations: ['category'],});

  }

  async findOne(id: number): Promise<Food> {
    return this.foodRepository.findOneBy({ id });
  }

  async createBulk(foods: Food[]): Promise<Food[]> {
    for (const food of foods) {
      // Periksa kategori untuk setiap makanan
      if (!food.category || !food.category.id) {
        throw new Error('Category is required and must have an id');
      }

      const category = await this.categoryRepository.findOne({ where: { id: food.category.id } });

      if (!category) {
        throw new Error(`Category with id ${food.category.id} not found`);
      }

      food.category = category;
    }

    return this.foodRepository.save(foods);
  }

 // Membuat makanan baru
 async create(food: Food): Promise<Food> {
  // Pastikan food.category ada
  if (!food.category || !food.category.id) {
    throw new Error('Category is required and must have an id');
  }

  // Cari kategori berdasarkan ID yang ada pada food.category.id
  const category = await this.categoryRepository.findOne({
    where: { id: food.category.id }, // Menemukan kategori dengan ID
  });

  // Jika kategori tidak ditemukan, lemparkan error
  if (!category) {
    throw new Error('Category not found');
  }

  // Membuat food baru dengan kategori yang ditemukan
  const newFood = this.foodRepository.create({
    ...food,
    category: category, // Menyimpan relasi dengan kategori
  });

  // Menyimpan food yang baru
  return this.foodRepository.save(newFood);
}

async update(id: number, food: Food): Promise<Food> {
  // Mencari data makanan berdasarkan ID
  const existingFood = await this.foodRepository.findOne({ where: { id },
    relations: ['category'], });

  if (!existingFood) {
    throw new Error('Food not found');
  }

  // Jika kategori tidak ada, kita perlu mencari kategori yang ada dan mengaitkannya
  const category = await this.categoryRepository.findOne({
    where: { id: food.category.id },
  });

  if (!category) {
    throw new Error('Category not found');
  }

  // Perbarui data makanan yang ada
  const updatedFood = Object.assign(existingFood, food);
  updatedFood.category = category; // Menetapkan kategori yang baru

  return this.foodRepository.save(updatedFood); // Simpan perubahan
}

  async delete(id: number): Promise<void> {
    await this.foodRepository.delete(id);
  }
}
