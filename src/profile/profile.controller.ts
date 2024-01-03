import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor() {}

  @UseGuards(JwtAuthGuard) // Apply JWTAuthGuard to protect this endpoint
  @Get()
  getProfile(@Request() req) {
    const { name, email } = req.user;

    return {
      name,
      email,
    };
  }
}