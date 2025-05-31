import { Injectable } from '@nestjs/common';
import { Album } from './interfaces/album.interface';
import { randomUUID } from 'crypto';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  constructor(private readonly tracksService: TracksService) {}

  findAll(): Omit<Album, 'createdAt' | 'updatedAt'>[] {
    return this.albums.map((album) => ({
      id: album.id,
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    }));
  }

  findOne(id: string): Omit<Album, 'createdAt' | 'updatedAt'> | undefined {
    const album = this.albums.find((a) => a.id === id);
    if (!album) return undefined;
    return {
      id: album.id,
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    };
  }

  create(dto: Partial<Album>): Omit<Album, 'createdAt' | 'updatedAt'> {
    const now = Date.now();
    const album: Album = {
      id: randomUUID(),
      name: dto.name || '',
      year: dto.year || 2000,
      artistId: dto.artistId || null,
      createdAt: now,
      updatedAt: now,
    };
    this.albums.push(album);
    return {
      id: album.id,
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    };
  }

  update(
    id: string,
    dto: Partial<Album>,
  ): Omit<Album, 'createdAt' | 'updatedAt'> | undefined {
    const album = this.albums.find((a) => a.id === id);
    if (!album) return undefined;
    Object.assign(album, dto, { updatedAt: Date.now() });
    return {
      id: album.id,
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    };
  }

  remove(id: string): boolean {
    this.tracksService.nullifyAlbum(id);
    const idx = this.albums.findIndex((a) => a.id === id);
    if (idx === -1) return false;
    this.albums.splice(idx, 1);
    return true;
  }

  nullifyArtist(artistId: string) {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }

  nullifyAlbum(albumId: string, tracksService?: any) {
    if (tracksService) {
      tracksService.nullifyAlbum(albumId);
    }
  }
}
