import { Controller, Post, Get, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // Checkout / Create Order
  @UseGuards(JwtAuthGuard)  // Menggunakan JwtAuthGuard untuk memastikan pengguna terautentikasi
  @Post('checkout')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await this.orderService.createOrder(createOrderDto);
      return {
        message: 'Order berhasil dibuat',
        order,
      };
    } catch (error) {
      return {
        message: 'Gagal membuat order',
        error: error.message,
      };
    }
  }

  // Get All Orders
  @Get()
  async getAllOrders() {
    try {
      const orders = await this.orderService.getAllOrders();
      return orders;
    } catch (error) {
      return {
        message: 'Gagal mendapatkan daftar order',
        error: error.message,
      };
    }
  }

  // Get Order by ID
  @Get(':id')
  async getOrderById(@Param('id') id: number) {
    try {
      const order = await this.orderService.getOrderById(id);
      return order;
    } catch (error) {
      return {
        message: `Gagal mendapatkan order dengan ID ${id}`,
        error: error.message,
      };
    }
  }

  // Delete Order
  @Delete(':id')
  async deleteOrder(@Param('id') id: number) {
    try {
      await this.orderService.deleteOrder(id);
      return { message: `Order dengan ID ${id} telah dihapus` };
    } catch (error) {
      return {
        message: `Gagal menghapus order dengan ID ${id}`,
        error: error.message,
      };
    }
  }
}
