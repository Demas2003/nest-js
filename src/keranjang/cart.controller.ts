// import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
// import { CartService } from './cart.service';
// import { CreateCartDto } from './create-cart.dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// @Controller('cart')
// @UseGuards(JwtAuthGuard)
// export class CartController {
//   constructor(private readonly cartService: CartService) {}

//   @Get()
//   async findAll() {
//     return this.cartService.findAll();
//   }

//   @Post()
//   async create(@Body() createCartDto: CreateCartDto) {
//     return this.cartService.create(createCartDto);
//   }

//   @Delete(':id')
//   async delete(@Param('id') id: number) {
//     await this.cartService.delete(id);
//     return { message: 'Item deleted successfully' };
//   }
// }

// cart.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(@Body() body: any) {
    // Anda bisa memvalidasi atau memproses item yang diterima dari frontend

    // Simpan item ke database atau session (misalnya dengan Redis, MongoDB, atau database lain)
    try {
      const cart = await this.cartService.addItemToCart(body.item);
      return {
        message: 'Item berhasil ditambahkan ke keranjang',
        cart,
      };
    } catch (error) {
      return {
        message: 'Gagal menambahkan item ke keranjang',
        error: error.message,
      };
    }
  }
}