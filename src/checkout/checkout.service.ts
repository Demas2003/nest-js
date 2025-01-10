import { Injectable } from '@nestjs/common';
import { CheckoutDto } from './checkout.dto';

@Injectable()
export class CheckoutService {
  // Simulasi penyimpanan data order
  private orders = [];

  // Method untuk memproses checkout dan menyimpan order
  async processCheckout(
    customerName: string,
    tableNumber: string,
    cartItems: CheckoutDto['cartItems'],
    totalPrice: number,
  ) {
    // Membuat ID pesanan secara acak
    const orderId = Math.floor(Math.random() * 10000);

    // Simulasi penyimpanan pesanan (misalnya ke dalam array)
    const newOrder = {
      orderId,
      customerName,
      tableNumber,
      cartItems,
      totalPrice,
      date: new Date(),
    };

    // Menyimpan order dalam array
    this.orders.push(newOrder);
    console.log('Order berhasil diproses:', newOrder);

    return newOrder;
  }

  // Method untuk mendapatkan semua orders (opsional)
  getAllOrders() {
    return this.orders;
  }
}
