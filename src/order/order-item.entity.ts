import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order: Order;

  // Informasi Makanan disalin langsung
  @Column()
  makanan_kode: string;  // Kode makanan (contoh: "F001")

  @Column()
  makanan_nama: string;  // Nama makanan (contoh: "Nasi Goreng")

  @Column('decimal')
  makanan_harga: number;  // Harga makanan (contoh: 25000.00)

  @Column()
  jumlah_pesanan: number;  // Jumlah pesanan
}
