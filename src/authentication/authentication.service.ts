import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthenticationEntity } from "@authentication/entities/authentication.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "@authentication/dto/login.dto";
import { UserEntity } from "@model/user/entities/user.entity";

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(AuthenticationEntity)
    private readonly authenticationRepository: Repository<AuthenticationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {

  }


  async generateJwt(payload: any) {
    return this.jwtService.sign(payload);
  }

  async signIn(user: LoginDto) {
    if (!user) {
      throw new BadRequestException("Unauthenticated");
    }
    const userExists = await this.authenticationRepository.findOne({ where: { email: user.email } });
    if (!userExists) {
      return this.registerUser(user);
    }
    return this.generateJwt(userExists);
  }

  private async registerUser(user: LoginDto) {
    try {
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);

      return this.generateJwt({
        newUser
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


}
