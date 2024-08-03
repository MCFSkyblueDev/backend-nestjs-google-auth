import { PassportSerializer } from "@nestjs/passport";
import { AuthenticationService } from "@authentication/authentication.service";

export class SessionSerializer extends PassportSerializer {
  constructor(private authenticationService: AuthenticationService) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  serializerUser(user: null, done: Function) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function): any {
    const user = await this.authenticationService.findOne(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}