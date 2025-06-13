import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('favs')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: string) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new HttpException(
        { message: 'Invalid trackId (not uuid)' },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      return this.favoritesService.addTrack(id);
    } catch (e) {
      if (
        e instanceof HttpException &&
        e.getStatus() === HttpStatus.NOT_FOUND
      ) {
        throw new HttpException({ message: 'Track not found' }, 422);
      }
      throw e;
    }
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: string) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new HttpException(
        { message: 'Invalid albumId (not uuid)' },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      return this.favoritesService.addAlbum(id);
    } catch (e) {
      if (
        e instanceof HttpException &&
        e.getStatus() === HttpStatus.NOT_FOUND
      ) {
        throw new HttpException({ message: 'Album not found' }, 422);
      }
      throw e;
    }
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: string) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new HttpException(
        { message: 'Invalid artistId (not uuid)' },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      return this.favoritesService.addArtist(id);
    } catch (e) {
      if (
        e instanceof HttpException &&
        e.getStatus() === HttpStatus.NOT_FOUND
      ) {
        throw new HttpException({ message: 'Artist not found' }, 422);
      }
      throw e;
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new HttpException(
        { message: 'Invalid trackId (not uuid)' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const removed = this.favoritesService.removeTrack(id);
    if (!removed) {
      throw new HttpException(
        { message: 'Track not in favorites' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new HttpException(
        { message: 'Invalid albumId (not uuid)' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const removed = this.favoritesService.removeAlbum(id);
    if (!removed) {
      throw new HttpException(
        { message: 'Album not in favorites' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new HttpException(
        { message: 'Invalid artistId (not uuid)' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const removed = this.favoritesService.removeArtist(id);
    if (!removed) {
      throw new HttpException(
        { message: 'Artist not in favorites' },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
