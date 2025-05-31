import { Injectable } from '@nestjs/common';
import { Track } from './interfaces/track.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  findAll(): Omit<Track, 'createdAt' | 'updatedAt'>[] {
    return this.tracks.map((track) => ({
      id: track.id,
      name: track.name,
      artistId: track.artistId,
      albumId: track.albumId,
      duration: track.duration,
    }));
  }

  findOne(id: string): Omit<Track, 'createdAt' | 'updatedAt'> | undefined {
    const track = this.tracks.find((t) => t.id === id);
    if (!track) return undefined;
    return {
      id: track.id,
      name: track.name,
      artistId: track.artistId,
      albumId: track.albumId,
      duration: track.duration,
    };
  }

  create(dto: Partial<Track>): Omit<Track, 'createdAt' | 'updatedAt'> {
    const now = Date.now();
    const track: Track = {
      id: randomUUID(),
      name: dto.name || '',
      artistId: dto.artistId || null,
      albumId: dto.albumId || null,
      duration: dto.duration || 0,
      createdAt: now,
      updatedAt: now,
    };
    this.tracks.push(track);
    return {
      id: track.id,
      name: track.name,
      artistId: track.artistId,
      albumId: track.albumId,
      duration: track.duration,
    };
  }

  update(
    id: string,
    dto: Partial<Track>,
  ): Omit<Track, 'createdAt' | 'updatedAt'> | undefined {
    const track = this.tracks.find((t) => t.id === id);
    if (!track) return undefined;
    Object.assign(track, dto, { updatedAt: Date.now() });
    return {
      id: track.id,
      name: track.name,
      artistId: track.artistId,
      albumId: track.albumId,
      duration: track.duration,
    };
  }

  remove(id: string): boolean {
    const idx = this.tracks.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    this.tracks.splice(idx, 1);
    return true;
  }

  nullifyArtist(artistId: string) {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  nullifyAlbum(albumId: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}
