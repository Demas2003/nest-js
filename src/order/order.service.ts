import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderDto } from './create-order.dto';
import { Cart } from '../keranjang/cart.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  // Checkout - Pindahkan dari Cart ke Order
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { nama, noMeja } = createOrderDto;

    // Ambil semua item di Cart
    const cartItems = await this.cartRepository.find({ relations: ['makanan'] });
    if (cartItems.length === 0) {
      throw new NotFoundException('Keranjang kosong!');
    }

    // Buat order baru
    const order = this.orderRepository.create({ nama, noMeja });
    await this.orderRepository.save(order);

    // Pindahkan item dari Cart ke OrderItem
    for (const cartItem of cartItems) {
      // Ambil data makanan dari cartItem
      const { makanan } = cartItem;

      // Membuat OrderItem dengan informasi makanan yang disalin langsung
      const orderItem = this.orderItemRepository.create({
        order,
        makanan_kode: makanan.kode,  // Menyimpan kode makanan
        makanan_nama: makanan.nama,  // Menyimpan nama makanan
        makanan_harga: makanan.harga,  // Menyimpan harga makanan
        jumlah_pesanan: cartItem.jumlah_pesanan,
      });

      // Simpan orderItem
      await this.orderItemRepository.save(orderItem);
    }

    // Kosongkan Cart setelah checkout
    await this.cartRepository.remove(cartItems);

    return order;
  }

  // Get All Orders with Items
  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['orderItems'],
    });
  }

  // Get Order by ID with Items
  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems'],
    });
    if (!order) {
      throw new NotFoundException(`Order dengan ID ${id} tidak ditemukan!`);
    }
    return order;
  }

  // DELETE ORDER
  async deleteOrder(id: number): Promise<void> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order dengan ID ${id} tidak ditemukan`);
    }
    await this.orderRepository.remove(order);
  }
}
