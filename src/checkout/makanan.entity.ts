import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartItem } from './cart-item.entity';  // Import CartItem untuk relasi

@Entity('makanan')
export class Makanan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kode: string;

  @Column()
  nama: string;

  @Column('decimal')
  harga: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.makanan)
  cartItems: CartItem[];  // Relasi dengan CartItem
}
