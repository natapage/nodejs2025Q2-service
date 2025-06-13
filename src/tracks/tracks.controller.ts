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
  UseGuards,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Track } from './interfaces/track.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('track')
@UseGuards(JwtAuthGuard)
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new HttpException(
        { message: 'Invalid trackId (not uuid)' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const track = this.tracksService.findOne(id);
    if (!track) {
      throw new HttpException(
        { message: 'Track not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return track;
  }

  @Post()
  create(@Body() dto: Partial<Track>) {
    if (!dto.name || dto.duration === undefined) {
      throw new HttpException(
        { message: 'Missing required fields' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.tracksService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<Track>) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new HttpException(
        { message: 'Invalid trackId (not uuid)' },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      (dto.name !== undefined && typeof dto.name !== 'string') ||
      (dto.duration !== undefined && typeof dto.duration !== 'number') ||
      (dto.artistId !== undefined &&
        dto.artistId !== null &&
        typeof dto.artistId !== 'string') ||
      (dto.albumId !== undefined &&
        dto.albumId !== null &&
        typeof dto.albumId !== 'string')
    ) {
      throw new HttpException(
        { message: 'Invalid dto' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const track = this.tracksService.update(id, dto);
    if (!track) {
      throw new HttpException(
        { message: 'Track not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new HttpException(
        { message: 'Invalid trackId (not uuid)' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const deleted = this.tracksService.remove(id);
    if (!deleted) {
      throw new HttpException(
        { message: 'Track not found' },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
