import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Playlist } from './playlist';
import { PlaylistResult } from './playlist-result';
import { PlaylistService } from './playlist.service';
import { TrackResult } from './track-result';


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

  describe('hasMorePlaylists', () => {
    it('should have a next page', () => {
      playlistResult.next = 'http://api.deezer.com/nextPage';
      service['playlistResult'] = new BehaviorSubject<PlaylistResult>(playlistResult);

      expect(service.hasMorePlaylists()).toBe(true);
    });

    it('should not have a next page', () => {
      playlistResult.next = null;
      service['playlistResult'] = new BehaviorSubject<PlaylistResult>(playlistResult);

      expect(service.hasMorePlaylists()).toBe(false);
    });
  });

  describe('loadMorePlaylists', () => {
    it('should not call http service', () => {
      // Arrange
      playlistResult.next = null;
      service['playlistResult'] = new BehaviorSubject<PlaylistResult>(playlistResult);

      // Act
      service.loadMorePlaylists();

      // Assert
      const req = httpTestingController.expectNone('https://api.deezer.com/user/5/playlists');
    });

    it('should call loadMorePlaylists and make an http call', () => {
      // Arrange
      const nextPlaylistResult = {
        data: [new Playlist(2, 'playlist2')],
        next: null,
        total: 1
      };
      playlistResult.next = '/api/user/5/playlists/?offset=25';
      service['playlistResult'] = new BehaviorSubject<PlaylistResult>(playlistResult);

      // Act
      service.loadMorePlaylists();

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
    it('should get a default playlist', () => {
      // Arrange

      // Act
      service.getPlaylist().subscribe(
        result => expect(result).toEqual(playlist1)
      );

      // Assert
      const req = httpTestingController.expectOne('https://api.deezer.com/playlist/908622995');

      req.flush(playlist1);
    });
  });
  describe('getPlaylistTracks', () => {
    it('should fetch playlist tracks without any parameter', () => {
      // Arrange
      const playlist1Tracks = new TrackResult([], 0);

      // Act
      service.getPlaylistTracks(playlist1).subscribe(
        result => expect(result).toEqual(playlist1Tracks)
      );

      // Asert
      const req = httpTestingController.expectOne(playlist1.tracklist);

      req.flush(playlist1Tracks);
    });
  });
});
