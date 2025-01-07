import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Food } from '../food/food.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jumlah_pesanan: number;

  @ManyToOne(() => Food, { eager: true }) // Relasi ke makanan
  makanan: Food;
  
}
