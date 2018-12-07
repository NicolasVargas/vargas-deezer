import { TestBed } from '@angular/core/testing';

import { PlaylistService } from './playlist.service';
import {
  HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing';
import { Playlist } from './playlist';
import { HttpClient } from '@angular/common/http';
import { of, BehaviorSubject } from 'rxjs';
import { PlaylistResult } from './playlist-result';

describe('PlaylistServiceService', () => {

  let httpTestingController: HttpTestingController;
  let service: PlaylistService;

  let playlistResult: PlaylistResult;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlaylistService]
    });

    service = TestBed.get(PlaylistService);
    httpTestingController = TestBed.get(HttpTestingController);

    const playlist1: Playlist = new Playlist(1, 'p1', 'psm', 'pmd', 'playlist1', 'tracks', 1);
    const playlist2: Playlist = new Playlist(2, 'p1', 'psm', 'pmd', 'playlist2', 'tracks', 4);
    const playlist: Playlist[] = [playlist1, playlist2];
    playlistResult = new PlaylistResult(playlist, '', playlist.length);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    const playlistService: PlaylistService = TestBed.get(PlaylistService);
    expect(playlistService).toBeTruthy();
  });

  describe('getPlaylists', () => {
    it('should return an observable of playlists', () => {
      // Arrange

      // Act
      service.getPlaylists(6).subscribe(
        result => expect(result).toEqual(playlistResult)
      );

      // Assert
      const req = httpTestingController.expectOne('https://api.deezer.com/user/6/playlists');

      req.flush(playlistResult);

    });
    
    it('should fetch playlist with default id to 5', () => {
      // Arrange

      // Act
      service.getPlaylists().subscribe(
        result => expect(result).toEqual(playlistResult)
      );

      // Assert
      const req = httpTestingController.expectOne('https://api.deezer.com/user/5/playlists');

      req.flush(playlistResult);

    });
  });

  describe('hasNext', () => {
    it('should have a next page', () => {
      playlistResult.next = 'http://api.deezer.com/nextPage';
      service['_playlistResult'] = new BehaviorSubject<PlaylistResult>(playlistResult);

      expect(service.hasNext()).toBe(true);
    });

    it('should have a next page', () => {
      playlistResult.next = null;
      service['_playlistResult'] = new BehaviorSubject<PlaylistResult>(playlistResult);

      expect(service.hasNext()).toBe(false);
    });
  });

  describe('getNext', () => {
    it('should not call http service', () => {
      // Arrange
      playlistResult.next = null;
      service['_playlistResult'] = new BehaviorSubject<PlaylistResult>(playlistResult);

      // Act
      service.getNext();

      // Assert
      const req = httpTestingController.expectNone('https://api.deezer.com/user/5/playlists');
    });

    it('should call getNext', () => {
      // Arrange
      const nextPlaylistResult = {
        data: [new Playlist(2, 'p1', 'psm', 'pmd', 'playlist2', 'tracks', 4)],
        next: null,
        total: 1
      }; 
      playlistResult.next = '/api/user/5/playlists/?offset=25';
      service['_playlistResult'] = new BehaviorSubject<PlaylistResult>(playlistResult);

      // Act
      service.getNext();

      // Assert
      const req = httpTestingController.expectOne('/api/user/5/playlists/?offset=25');

      req.flush(nextPlaylistResult);
    });
  });
});
