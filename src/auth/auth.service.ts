import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { UserResponse } from './types/user-response';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<UserResponse> {
    const user = await this.usersService.create(registerUserDto);
    const token = this.generateToken({ ...user, role: 'user' });
    return { user, token };
  }

  async login(loginUserDto: LoginUserDto): Promise<UserResponse> {
    const user = await this.usersService.check(loginUserDto);
    console.log(user);
    const token = this.generateToken(user);
    return { user, token };
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private generateToken(payload: any): string {
    return jwt.sign(payload, this.configService.get<string>('SECRET_KEY'), {
      expiresIn: this.configService.get<string>('EXPIRES_IN'),
    });
  }

  verifyToken(token: string): any {
    return jwt.verify(token, this.configService.get<string>('SECRET_KEY'));
  }
}
