import {
  Controller,
  Get,
  // Post,
  Body,
  Patch,
  // Param,
  // Delete,
  Request,
  // UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
// import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // @ApiCreatedResponse({ type: UserEntity })
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // @ApiOkResponse({ type: UserEntity, isArray: true })
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get()
  @ApiOkResponse({ type: UserEntity })
  findOne(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }

  @Patch()
  @ApiOkResponse({ type: UserEntity })
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  // @Delete(':id')
  // @ApiOkResponse({ type: UserEntity })
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(id);
  // }
}
