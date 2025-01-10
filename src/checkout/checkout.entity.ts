import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Checkout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  tableNumber: string;

  @Column('decimal')
  totalPrice: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.checkout)
  cartItems: CartItem[];
}
