import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { JwtStrategy } from './jwt.strategy'; // Ensure the JwtStrategy is imported

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Import User entity to interact with DB
    PassportModule, // Import PassportModule for authentication
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'y$2y$10$5MhFjtB3pmwBiDKycaTFVOLASpeRFyA9zXiZsgfkDsNN2JbG4FE0y', // Securely load secret from environment variables
      signOptions: { expiresIn: '1h' }, // Token expires in 1 hour
    }),
  ],
  controllers: [AuthController], // Register the AuthController
  providers: [AuthService, JwtStrategy], // Register AuthService and JwtStrategy
  exports: [JwtModule], // Export JwtModule if other modules need it
})
export class AuthModule {}
