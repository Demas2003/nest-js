import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Food } from '../food/food.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Food])], // Tambahkan Cart dan Food
  controllers: [CartController],  // Daftarkan CartController
  providers: [CartService],  // Daftarkan CartService
})
export class CartModule {}
