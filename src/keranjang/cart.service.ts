// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Cart } from './cart.entity';
// import { Food } from '../food/food.entity';
// import { CreateCartDto } from './create-cart.dto';

// @Injectable()
// export class CartService {
//   constructor(
//     @InjectRepository(Cart)
//     private cartRepository: Repository<Cart>, // Pastikan ini sesuai dengan entitas Cart

//     @InjectRepository(Food)
//     private foodRepository: Repository<Food>, // Pastikan ini sesuai dengan entitas Food
//   ) {}

//   async findAll(): Promise<Cart[]> {
//     return this.cartRepository.find();
//   }

//   async create(createCartDto: CreateCartDto): Promise<Cart> {
//     const { jumlah_pesanan, makananId } = createCartDto;
//     const makanan = await this.foodRepository.findOne({ where: { id: makananId } });

//     if (!makanan) {
//       throw new Error('Makanan not found');
//     }

//     const cart = this.cartRepository.create({
//       jumlah_pesanan,
//       makanan,
//     });

//     return this.cartRepository.save(cart);
//   }

//   async delete(id: number): Promise<void> {
//     await this.cartRepository.delete(id);
//   }
// }

// cart.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
  private cart: any[] = []; // Gunakan database atau Redis untuk penyimpanan yang lebih baik

  async addItemToCart(item: any): Promise<any> {
    // Anda bisa menyimpan data keranjang ke database
    // Misalnya menggunakan TypeORM untuk menyimpan keranjang ke database
    this.cart.push(item);  // Menambahkan item ke keranjang (sebaiknya menggunakan database untuk penyimpanan yang lebih baik)

    return this.cart;  // Mengembalikan keranjang yang sudah diperbarui
  }
}
