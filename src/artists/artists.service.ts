import { Injectable } from '@nestjs/common';
import { Artist } from './interfaces/artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { randomUUID } from 'crypto';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  constructor(
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist | undefined {
    return this.artists.find((a) => a.id === id);
  }

  create(dto: CreateArtistDto): Artist {
    const artist: Artist = {
      id: randomUUID(),
      name: dto.name,
      grammy: dto.grammy,
    };
    this.artists.push(artist);
    return artist;
  }

  update(id: string, dto: UpdateArtistDto): Artist | undefined {
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) return undefined;
    artist.name = dto.name;
    artist.grammy = dto.grammy;
    return artist;
  }

  remove(id: string): boolean {
    this.albumsService.nullifyArtist(id);
    this.tracksService.nullifyArtist(id);
    const idx = this.artists.findIndex((a) => a.id === id);
    if (idx === -1) return false;
    this.artists.splice(idx, 1);
    return true;
  }
}
