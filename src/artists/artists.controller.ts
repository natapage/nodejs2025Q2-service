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
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistsService.findOne(id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  @Post()
  create(@Body() dto: CreateArtistDto) {
    if (typeof dto.name !== 'string' || typeof dto.grammy !== 'boolean') {
      throw new HttpException(
        'Missing or invalid required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.artistsService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateArtistDto,
  ) {
    if (
      (dto.name !== undefined && typeof dto.name !== 'string') ||
      (dto.grammy !== undefined && typeof dto.grammy !== 'boolean')
    ) {
      throw new HttpException('Invalid dto', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artistsService.update(id, dto);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const deleted = this.artistsService.remove(id);
    if (!deleted) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }
}
