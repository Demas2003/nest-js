import { Injectable, UnauthorizedException , NotFoundException , HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, LoginDto ,  } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  private blacklistedTokens: Set<string> = new Set();
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { username, password, role } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, password: hashedPassword, role });

    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
  
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const payload = { username: user.username, role: user.role };
    const token = this.jwtService.sign(payload);
  
    return {
      RequiresAuth: true,  // Menambahkan properti RequiresAuth
      access_token: token,
      role: user.role
    };
  }

   // Validate JWT token
   async validateUser(token: string): Promise<boolean> {
    // Memeriksa apakah token ada dalam blacklist
    return this.blacklistedTokens.has(token);
  }

  // Logout: Menambahkan token ke blacklist
  async logout(token: string): Promise<void> {
    // Menambahkan token ke blacklist (di memori)
    this.blacklistedTokens.add(token);
  }
   // Update user (update username)
   async updateUsername(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } }); // <-- Corrected here
    if (!user) {
      throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND); // <-- Use HttpException
    }

    user.username = updateUserDto.username;
    return await this.userRepository.save(user);
  }

  // Delete user
  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

   // Get all users
   async getAllUsers(): Promise<User[]> {
    return this.userRepository.find(); // Mengambil semua pengguna
  }

  // Get user by id
  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } }); // Mengambil pengguna berdasarkan id
    if (!user) {
      throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND); // Menangani jika tidak ditemukan
    }
    return user;
  }

  
}
