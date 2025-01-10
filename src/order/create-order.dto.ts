export class CreateOrderDto {
  nama: string;
  noMeja: string;
}

// import { IsArray, IsDecimal, IsString } from 'class-validator';

// export class CreateOrderDto {
//   @IsString()
//   customerName: string;

//   @IsString()
//   tableNumber: string;

//   @IsArray()
//   cartItems: {
//     name: string;
//     price: number;
//     quantity: number;
//   }[];

//   @IsDecimal()
//   totalPrice: number;
// }

