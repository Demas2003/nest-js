import { Controller, Post, Get, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // Checkout / Create Order
  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  // Get All Orders
  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  // Get Order by ID
  @Get(':id')
  async getOrderById(@Param('id') id: number) {
    return this.orderService.getOrderById(id);
  }

  // Delete Order
  @Delete(':id')
  async deleteOrder(@Param('id') id: number) {
    return this.orderService.deleteOrder(id);
  }
}
