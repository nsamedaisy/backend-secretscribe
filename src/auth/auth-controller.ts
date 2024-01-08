import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
   async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    const user_and_token = await this.authService.signUp(signUpDto);

    return user_and_token

  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}

//   @Post('/login')
// login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
//   return this.authService.login(loginDto);
// }