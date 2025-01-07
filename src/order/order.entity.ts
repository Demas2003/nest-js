import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable , OneToMany} from 'typeorm';
import { Cart } from '../keranjang/cart.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

  @Column()
  noMeja: string;

  @ManyToMany(() => Cart, { cascade: true })
  @JoinTable()
  cart: Cart[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];
}
