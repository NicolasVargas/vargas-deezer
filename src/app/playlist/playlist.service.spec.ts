import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Playlist } from './_model/playlist';
import { PlaylistResult } from './_model/playlist-result';
import { PlaylistService } from './playlist.service';
import { TrackResult } from './_model/track-result';


describe('PlaylistServiceService', () => {

  let httpTestingController: HttpTestingController;
  let service: PlaylistService;

  let playlistResult: PlaylistResult;
  let playlist1: Playlist;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlaylistService]
    });

    service = TestBed.get(PlaylistService);
    httpTestingController = TestBed.get(HttpTestingController);

    playlist1 = new Playlist(1, 'playlist1');
    playlist1.tracklist = '/tracks';
    const playlist2: Playlist = new Playlist(2, 'playlist1');
    const playlist: Playlist[] = [playlist1, playlist2];
    playlistResult = new PlaylistResult(playlist, playlist.length, '');
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
  });

  describe('hasMorePlaylists', () => {
    it('should have a next page', () => {
      playlistResult.next = 'http://api.deezer.com/nextPage';

      expect(service.hasMorePlaylists(playlistResult)).toBe(true);
    });

    it('should not have a next page', () => {
      playlistResult.next = null;

      expect(service.hasMorePlaylists(playlistResult)).toBe(false);
    });
  });

  describe('loadMorePlaylists', () => {
    it('should not call http service', () => {
      // Arrange
      playlistResult.next = null;

      // Act
      service.loadMorePlaylists(playlistResult);

      // Assert
      const req = httpTestingController.expectNone('https://api.deezer.com/user/5/playlists');
    });

    it('should make an http call', () => {
      // Arrange
      const nextPlaylistResult = {
        data: [new Playlist(2, 'playlist2')],
        next: null,
        total: 1
      };
      playlistResult.next = '/api/user/5/playlists/?offset=25';

      // Act
      service.loadMorePlaylists(playlistResult).subscribe((res: PlaylistResult) => {
        expect(res).toEqual(nextPlaylistResult);
      });

      // Assert
      const req = httpTestingController.expectOne('/api/user/5/playlists/?offset=25');

      req.flush(nextPlaylistResult);
    });
  });
  describe('getPlaylist', () => {
    it('should get a playlist', () => {
      // Arrange

      // Act
      service.getPlaylist(15).subscribe(
        result => expect(result).toEqual(playlist1)
      );

      // Assert
      const req = httpTestingController.expectOne('https://api.deezer.com/playlist/15');

      req.flush(playlist1);
    });
  });
  describe('getTracks', () => {
    it('should fetch playlist tracks', () => {
      // Arrange
      const playlist1Tracks = new TrackResult([], 0);

      // Act
      service.getTracks(playlist1.id).subscribe(
        result => expect(result).toEqual(playlist1Tracks)
      );

      // Asert
      const req = httpTestingController.expectOne(`https://api.deezer.com/playlist/${playlist1.id}/tracks`);

      req.flush(playlist1Tracks);
    });
  });
});
