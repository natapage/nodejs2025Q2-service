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
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album } from './interfaces/album.interface';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new HttpException(
        { message: 'Invalid albumId (not uuid)' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const album = this.albumsService.findOne(id);
    if (!album) {
      throw new HttpException(
        { message: 'Album not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return album;
  }

  @Post()
  create(@Body() dto: Partial<Album>) {
    if (!dto.name || dto.year === undefined) {
      throw new HttpException(
        { message: 'Missing required fields' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.albumsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<Album>) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new HttpException(
        { message: 'Invalid albumId (not uuid)' },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      (dto.name !== undefined && typeof dto.name !== 'string') ||
      (dto.year !== undefined && typeof dto.year !== 'number') ||
      (dto.artistId !== undefined &&
        dto.artistId !== null &&
        typeof dto.artistId !== 'string')
    ) {
      throw new HttpException(
        { message: 'Invalid dto' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const album = this.albumsService.update(id, dto);
    if (!album) {
      throw new HttpException(
        { message: 'Album not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new HttpException(
        { message: 'Invalid albumId (not uuid)' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const deleted = this.albumsService.remove(id);
    if (!deleted) {
      throw new HttpException(
        { message: 'Album not found' },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
