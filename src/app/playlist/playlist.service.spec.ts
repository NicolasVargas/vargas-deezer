import { TestBed } from '@angular/core/testing';

import { PlaylistService } from './playlist.service';
import {
  HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing';
import { Playlist } from './playlist';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
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

    playlistResult = {
      data: [],
      next: null,
      total: 0
    };

    service['_lastPlaylistResult'] = playlistResult;
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
      const playlist1: Playlist = new Playlist(1, 'p1', 'psm', 'pmd', 'playlist1', 'tracks', 1);
      const playlist2: Playlist = new Playlist(2, 'p1', 'psm', 'pmd', 'playlist2', 'tracks', 4);
      const expectedPlaylists: Playlist[] = [playlist1, playlist2];
      playlistResult.data = expectedPlaylists;

      // Act
      service.getPlaylists(6).subscribe(
        list => expect(list).toEqual(expectedPlaylists)
      );

      // Assert
      const req = httpTestingController.expectOne('https://api.deezer.com/user/6/playlists');

      req.flush(playlistResult);

    });
  });

  describe('hasNext', () => {
    it('should have a next page', () => {
      playlistResult.next = 'http://api.deezer.com/nextPage';

      expect(service.hasNext()).toBe(true);
    });

    it('should have a next page', () => {
      playlistResult.next = null;

      expect(service.hasNext()).toBe(false);
    });
  });

  describe('getNext', () => {
    it('should not call http service', () => {
      // Arrange
      playlistResult.next = null;

      // Act
      service.getNext();

      // Assert
      const req = httpTestingController.expectNone('https://api.deezer.com/user/5/playlists');
    });

    it('should call http service one time to get page start and one more time to get next page', () => {
      // Arrange
      playlistResult.next = 'http://api.com';
      const nextPlaylistResult = {
        data: [new Playlist(2, 'p1', 'psm', 'pmd', 'playlist2', 'tracks', 4)],
        next: null,
        total: 1
      };
      playlistResult.next = '/api/user/5/playlists/?offset=25';
      service.getPlaylists().subscribe();
      const firstRequest = httpTestingController.expectOne('https://api.deezer.com/user/5/playlists');
      firstRequest.flush(playlistResult);

      // Act
      service.getNext();

      // Assert
      const req = httpTestingController.expectOne('/api/user/5/playlists/?offset=25');

      req.flush(nextPlaylistResult);
    });
  });
});
