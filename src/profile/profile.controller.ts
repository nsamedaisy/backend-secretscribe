import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth.guard'; // Replace with the actual path to your JWTAuthGuard

@Controller('profile')
export class ProfileController {
  constructor() {}

  @UseGuards(JwtAuthGuard) // Apply JWTAuthGuard to protect this endpoint
  @Get()
  getProfile(@Request() req) {
    // Assuming you have the user's profile information stored in the request object
    const { name, email } = req.user;

    return {
      name,
      email,
    };
  }
}