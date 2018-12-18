import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatProgressSpinnerModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { of } from 'rxjs';
import { Playlist } from '../_model/playlist';
import { PlaylistService } from '../playlist.service';
import { TrackResult } from '../_model/track-result';
import { PlaylistDetailComponent } from './playlist-detail.component';


describe('PlaylistDetailComponent', () => {
  let component: PlaylistDetailComponent;
  let fixture: ComponentFixture<PlaylistDetailComponent>;
  let playlistService;

  beforeEach(async(() => {
    const mockedActivateRoute = {
      snapshot: {
        data: {
          playlist: new Playlist(0, 'Playlist Title', '', '', '', '', '/tracks', 2, 5, [], { name: 'author' }),
          trackResult: new TrackResult([], 0)
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [PlaylistDetailComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatTableModule,
        MatProgressSpinnerModule,
        RouterTestingModule,
        InfiniteScrollModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockedActivateRoute },
        PlaylistService
      ]
    })
      .compileComponents();

    playlistService = TestBed.get(PlaylistService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onScrollDown', () => {
    it('should not fetch next page when result has no next page', () => {
      // Arrange
      const spyLoadMore = spyOn(playlistService, 'loadMoreTracks');
      // Act
      component.onScrollDown();
      // Assert
      expect(spyLoadMore).not.toHaveBeenCalled();
    });
    it('should fetch next page with loadMoreTracks', () => {
      // Arrange
      component.trackResult = new TrackResult([], 0, 'nextUrl');
      const spyHasMore = spyOn(playlistService, 'hasMoreTracks').and.callThrough();
      const spyLoadMore = spyOn(playlistService, 'loadMoreTracks').and.returnValue(of(new TrackResult([], 0)));
      // Act
      component.onScrollDown();
      // Assert
      expect(spyLoadMore).toHaveBeenCalled();
    });
  });
});
