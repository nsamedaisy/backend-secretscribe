import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const res = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    }).then((res: any) => res?._doc || res);

    const { password: _, ...user } = res;

    const token = this.jwtService.sign({ ...user });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const res = await this.userModel.findOne({ email }).then((res: any) => res?._doc || res);

    if (!res) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: userPass, ...user } = res;

    const isPasswordMatched = await bcrypt.compare(password, userPass);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ ...user });

    return { token };
  }

  async getCurrentUser(token: string): Promise<object> {
    const user = this.jwtService.verify(token);

    return user;
  }
}
