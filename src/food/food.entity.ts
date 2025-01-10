import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { OrderItem } from '../order/order-item.entity';
import { Category } from './category.entity';  // Pastikan path import sudah benar

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

  @ManyToOne(() => Category, (category) => category.foods)
  @JoinColumn({ name: 'category_id' })  // Bisa sesuaikan nama kolom jika diperlukan
  category: Category;  // Relasi ke entitas Category

  // Tidak ada lagi relasi OrderItem di sini, karena Anda sudah menghapus relasi yang menggunakan kolom `makanan`
}
