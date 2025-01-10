import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FoodModule } from './food/food.module';
import { CartModule } from './keranjang/cart.module';
import { OrderModule } from './order/order.module';
import { User } from './auth/user.entity';
import { Food } from './food/food.entity';
import { Cart } from './keranjang/cart.entity';
import { Order } from './order/order.entity';
import { OrderItem } from './order/order-item.entity';
import { Category } from './food/category.entity';
import { CheckoutModule } from './checkout/checkout.module';  // Pastikan ini diimpor


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'katalog-backend',
      entities: [User, Food, Cart, Order , OrderItem , Category ],
      synchronize: true, // Jangan aktifkan di production
    }),
    AuthModule,
    FoodModule,
    CartModule,
    OrderModule,
    CheckoutModule,
  ],
})
export class AppModule {}
