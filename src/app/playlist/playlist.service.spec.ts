import { TestBed } from '@angular/core/testing';

import { PlaylistService } from './playlist.service';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';

describe('PlaylistServiceService', () => {

  let httpClientSpy: { get: jasmine.Spy };
  let playlistService: PlaylistService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [PlaylistService]
  }));

  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    playlistService = new PlaylistService(<any>httpClientSpy);
  });

  it('should be created', () => {
    const service: PlaylistService = TestBed.get(PlaylistService);
    expect(service).toBeTruthy();
  });
});
