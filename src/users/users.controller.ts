import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get(':username')
  getUserProfile(@Param('username') username: string) {
    // Implement the logic to retrieve the user profile by username
  }
}