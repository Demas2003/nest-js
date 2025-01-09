import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Food } from '../food/food.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;  // Contoh: "Makanan", "Minuman"

  @OneToMany(() => Food, (food) => food.category)
  foods: Food[];
}
