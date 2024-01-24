import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: registerUserDto.email },
    });
    if (user) {
      return new ConflictException();
    }
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const data = {
      ...registerUserDto,
      password: hashedPassword,
      name: `${registerUserDto.firstName} ${registerUserDto.lastName}`,
    };
    delete data.firstName;
    delete data.lastName;
    return this.prisma.user.create({
      data,
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUserDto.username },
    });

    if (!user) {
      return new NotFoundException();
    }
    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);

    if (!isMatch) {
      return new UnauthorizedException();
    }
    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      name: user.name,
      birthYear: user.birthYear,
    });

    await this.prisma.userLogger.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(),
      },
    });
    // const { password, ...result } = user;
    return { token };
  }

  async logout(token) {
    console.log('token from logout', token);
    
    if (!token) {
      return new UnauthorizedException();
    }

    const data = await this.prisma.userLogger.findUnique({ where: { token } });

    if (!data) {
      return new UnauthorizedException();
    }

    await this.prisma.userLogger.delete({ where: { token } });

    return { message: 'User logged out successfully' };
  }
}
