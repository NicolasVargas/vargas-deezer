import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatPaginatorModule, MatProgressSpinnerModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Playlist } from '../playlist';
import { PlaylistService } from '../playlist.service';
import { TrackResult } from '../track-result';
import { PlaylistDetailComponent } from './playlist-detail.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


describe('PlaylistDetailComponent', () => {
  let component: PlaylistDetailComponent;
  let fixture: ComponentFixture<PlaylistDetailComponent>;
  let playlistServiceStub;

  beforeEach(async(() => {
    const mockedActivateRoute = {
      snapshot: {
        data: {
          playlist: new Playlist(0, 'Playlist Title', '', '', '', '/tracks', 2, 5, [], { name: 'author' }),
          trackResult: new TrackResult([], 0)
        }
      }
    };

    playlistServiceStub = jasmine.createSpyObj<PlaylistService>('PlaylistService',
      ['loadMoreTracks', 'hasMoreTracks']);

    TestBed.configureTestingModule({
      declarations: [PlaylistDetailComponent],
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule,
        MatProgressSpinnerModule,
        RouterTestingModule,
        InfiniteScrollModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockedActivateRoute },
        { provide: PlaylistService, useValue: playlistServiceStub }
      ]
    })
      .compileComponents();
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
      // Act
      component.onScrollDown();
      // Assert
      expect(playlistServiceStub.loadMoreTracks).not.toHaveBeenCalled();
    });
    it('should fetch next page with loadMoreTracks', () => {
      // Arrange
      component.trackResult = new TrackResult([], 0, 'nextUrl');
      // Act
      component.onScrollDown();
      // Assert
      expect(playlistServiceStub.loadMoreTracks).toHaveBeenCalled();
    });
  });
});
