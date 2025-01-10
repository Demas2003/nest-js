import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Checkout } from './checkout.entity';  // Import Checkout untuk relasi
import { Makanan } from './makanan.entity';    // Import Makanan untuk relasi

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Checkout, (checkout) => checkout.cartItems)
  checkout: Checkout; // Relasi dengan Checkout

  @ManyToOne(() => Makanan, (makanan) => makanan.cartItems)  // Relasi dengan Makanan
  makanan: Makanan;  // Menyimpan informasi Makanan

  @Column()
  makanan_kode: string;

  @Column()
  makanan_nama: string;

  @Column('decimal')
  makanan_harga: number;

  @Column()
  jumlah_pesanan: number;
}
