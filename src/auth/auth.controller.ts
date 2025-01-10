import { Controller, Post, Body , Put, Delete, Param , Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto , } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Get all users
  @Get()
  async getAllUsers() {
    return this.authService.getAllUsers();
  }

  // Get user by id
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.authService.getUserById(id);
  }

   // Update username
   @Put(':id/username')
   async updateUsername(
     @Param('id') id: number,
     @Body() updateUserDto: UpdateUserDto,
   ) {
     return this.authService.updateUsername(id, updateUserDto);
   }
 
   // Delete user
   @Delete(':id')
   async deleteUser(@Param('id') id: number) {
     return this.authService.deleteUser(id);
   }
 
}
