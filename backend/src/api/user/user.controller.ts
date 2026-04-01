import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { User } from "@prisma/client";

import { UserService } from "./user.service";

@ApiTags("Users")
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("users")
  async getAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
