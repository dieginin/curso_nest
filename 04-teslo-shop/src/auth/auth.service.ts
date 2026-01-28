import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { DatabaseError } from 'pg';
import { compareSync, hashSync } from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: hashSync(password, 10),
      });
      await this.userRepository.save(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true },
    });

    if (!user || !compareSync(password, user.password))
      throw new UnauthorizedException('Wrong credentials');

    return user;
  }

  private handleDBErrors(error: any): never {
    if ((error as DatabaseError).code === '23505')
      throw new ConflictException('An user with this email already exists');

    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
