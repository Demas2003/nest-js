import { Entity, PrimaryGeneratedColumn, Column , OneToMany } from 'typeorm';
import { OrderItem } from '../order/order-item.entity';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  kode: string;

  @Column()
  nama: string;

  @Column('decimal', { precision: 10, scale: 2 })
  harga: number;

  @Column({ default: true })
  is_ready: boolean;

  @Column({ nullable: true })
  gambar: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.makanan)
  orderItems: OrderItem[];
}
