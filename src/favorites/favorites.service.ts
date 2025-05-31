import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Favorites } from './interfaces/favorites.interface';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(TracksService) private readonly tracksService: TracksService,
    @Inject(AlbumsService) private readonly albumsService: AlbumsService,
    @Inject(ArtistsService) private readonly artistsService: ArtistsService,
  ) {}

  findAll() {
    const artists = this.favorites.artists
      .map((id) => this.artistsService.findOne(id))
      .filter(Boolean);
    const albums = this.favorites.albums
      .map((id) => this.albumsService.findOne(id))
      .filter(Boolean);
    const tracks = this.favorites.tracks
      .map((id) => this.tracksService.findOne(id))
      .filter(Boolean);
    return { artists, albums, tracks };
  }

  addTrack(id: string) {
    const track = this.tracksService.findOne(id);
    if (!track) {
      throw new HttpException(
        { message: 'Track not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    if (!this.favorites.tracks.includes(id)) {
      this.favorites.tracks.push(id);
    }
    return { message: 'Track added to favorites' };
  }

  addAlbum(id: string) {
    const album = this.albumsService.findOne(id);
    if (!album) {
      throw new HttpException(
        { message: 'Album not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    if (!this.favorites.albums.includes(id)) {
      this.favorites.albums.push(id);
    }
    return { message: 'Album added to favorites' };
  }

  addArtist(id: string) {
    const artist = this.artistsService.findOne(id);
    if (!artist) {
      throw new HttpException(
        { message: 'Artist not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    if (!this.favorites.artists.includes(id)) {
      this.favorites.artists.push(id);
    }
    return { message: 'Artist added to favorites' };
  }

  removeTrack(id: string): boolean {
    const index = this.favorites.tracks.indexOf(id);
    if (index === -1) {
      return false;
    }
    this.favorites.tracks.splice(index, 1);
    return true;
  }

  removeAlbum(id: string): boolean {
    const index = this.favorites.albums.indexOf(id);
    if (index === -1) {
      return false;
    }
    this.favorites.albums.splice(index, 1);
    return true;
  }

  removeArtist(id: string): boolean {
    const index = this.favorites.artists.indexOf(id);
    if (index === -1) {
      return false;
    }
    this.favorites.artists.splice(index, 1);
    return true;
  }
}
