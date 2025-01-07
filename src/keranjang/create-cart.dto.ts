import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsInt()
  jumlah_pesanan: number;

  @IsNotEmpty()
  makananId: number;
}
