import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";

import { ApiTags } from "@nestjs/swagger";
import { GoogleAuthGuard } from "@guard/google-auth.guard";

@ApiTags("Authentication")
@Controller("auth")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {
  }

  @Get("/google/login")
  @UseGuards(GoogleAuthGuard)
  handleLoginByGoogle() {
    return{
      message : "Hay"
    }
  }

  @Get("/google/redirect")
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return{
      message : "Redirect"
    }
  }
}
