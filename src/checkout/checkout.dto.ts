// src/checkout/checkout.dto.ts

export class CheckoutDto {
  customerName: string;
  tableNumber: string;
  cartItems: CartItem[];
  totalPrice: number;
}

export class CartItem {
  id: number;
  nama: string;
  keterangan: string;
  harga: number;
  quantity: number;
  note: string;
}
