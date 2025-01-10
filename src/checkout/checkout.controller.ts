import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './checkout.dto';

@Controller('order')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('checkout')
  async checkout(@Body() checkoutData: CheckoutDto) {
    const { customerName, tableNumber, cartItems, totalPrice } = checkoutData;

    // Validasi jika cartItems kosong
    if (!cartItems || cartItems.length === 0) {
      throw new HttpException(
        { message: 'Keranjang kosong!' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Validasi nama customer dan nomor meja
    if (!customerName || !tableNumber) {
      throw new HttpException(
        { message: 'Nama customer dan nomor meja harus diisi!' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Proses checkout
    try {
      const order = await this.checkoutService.processCheckout(
        customerName,
        tableNumber,
        cartItems,
        totalPrice,
      );
      return { message: 'Checkout berhasil!', orderId: order.orderId, status: 'success' };
    } catch (error) {
      throw new HttpException(
        { message: 'Terjadi kesalahan saat memproses checkout' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
