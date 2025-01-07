import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Order } from './order.entity';
import { Food } from '../food/food.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Food, (makanan) => makanan.orderItems)
  makanan: Food; // Relasi ke Makanan

  @Column()
  jumlah_pesanan: number; // Jumlah makanan yang dipesan
}
