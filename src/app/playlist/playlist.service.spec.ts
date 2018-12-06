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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlaylistService]
    });

    service = TestBed.get(PlaylistService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    const playlistService: PlaylistService = TestBed.get(PlaylistService);
    expect(playlistService).toBeTruthy();
  });

  it('should return an observable of playlists', () => {
    const playlist1: Playlist = new Playlist(1, 'p1', 'psm', 'pmd', 'playlist1', 'tracks', 1);
    const playlist2: Playlist = new Playlist(2, 'p1', 'psm', 'pmd', 'playlist2', 'tracks', 4);
    const expectedPlaylists: Playlist[] = [playlist1, playlist2];
    const playlistResult: PlaylistResult = {
      data: expectedPlaylists,
      next: null,
      total: expectedPlaylists.length
    };


    service.getPlaylists().subscribe(
      list => expect(list).toEqual(expectedPlaylists)
    );

    const req = httpTestingController.expectOne('/api/user/5/playlists');

    req.flush(playlistResult);

  });
});
