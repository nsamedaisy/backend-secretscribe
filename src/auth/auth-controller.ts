import { Body, Controller, Post, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    const user_and_token = await this.authService.signUp(signUpDto);

    return user_and_token

  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Get('/current-user')
  async currentUser(@Headers('authorization') authorization: string): Promise<{ user: object, error?: object }> {
    try {
      const token = authorization.split(' ').pop();

      const user = await this.authService.getCurrentUser(token);

      return { user }
    } catch (error) {
      return {
        user: null,
        error,
      }
    }
  }
}

//   @Post('/login')
// login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
//   return this.authService.login(loginDto);
// }