import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity'; // Tambahkan OrderItem
import { Cart } from '../keranjang/cart.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Cart])], // Tambahkan OrderItem
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService], // Pastikan service bisa digunakan di module lain jika perlu
})
export class OrderModule {}
