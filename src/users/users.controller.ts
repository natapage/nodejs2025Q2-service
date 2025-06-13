import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new HttpException(
        { message: 'Invalid userId (not uuid)' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.usersService.findOne(id);
    if (!user) {
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    if (!dto.login || !dto.password) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.usersService.create(dto);
  }

  @Put(':id')
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    if (
      !dto.oldPassword ||
      typeof dto.oldPassword !== 'string' ||
      !dto.newPassword ||
      typeof dto.newPassword !== 'string'
    ) {
      throw new HttpException('Invalid dto', HttpStatus.BAD_REQUEST);
    }
    const result = this.usersService.updatePassword(id, dto);
    if (result === 'not_found') {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (result === 'forbidden') {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }
    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const deleted = this.usersService.remove(id);
    if (!deleted) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
