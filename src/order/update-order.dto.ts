import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nama?: string; // Nama pelanggan (opsional dalam pembaruan)

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  noMeja?: string; // No meja (opsional dalam pembaruan)
}
