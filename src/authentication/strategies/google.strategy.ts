import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { LoginDto } from "@authentication/dto/login.dto";
import { AuthenticationService } from "@authentication/authentication.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private configService: ConfigService, private authenticationService: AuthenticationService) {
    super({
      clientID: configService.getOrThrow("GOOGLE_CLIENT_ID"),
      clientSecret: configService.getOrThrow("GOOGLE_CLIENT_SECRET"),
      callbackURL: configService.getOrThrow("GOOGLE_CALLBACK_URL"),
      scope: ["profile", "email"]
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, _done: VerifyCallback) {
    console.log(profile.id, profile.displayName, profile.emails[0].value, profile.photos[0].value);
    const newLoginDto = new LoginDto(profile.emails[0].value, profile.id, profile.photos[0].value, profile.displayName);
    await this.authenticationService.signIn(newLoginDto);
  }
}