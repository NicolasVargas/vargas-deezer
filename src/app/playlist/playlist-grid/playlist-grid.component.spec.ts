import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Playlist } from '../playlist';
import { PlaylistCardComponent } from '../playlist-card/playlist-card.component';
import { PlaylistResult } from '../playlist-result';
import { PlaylistService } from '../playlist.service';
import { PlaylistGridComponent } from './playlist-grid.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('PlaylistGridComponent', () => {
  let component: PlaylistGridComponent;
  let fixture: ComponentFixture<PlaylistGridComponent>;

  let playlistResult: PlaylistResult;
  let playlistServiceStub;

  beforeEach(async(() => {
    playlistResult = new PlaylistResult([], 0, '');

    playlistServiceStub = jasmine.createSpyObj<PlaylistService>('PlaylistService',
      ['getPlaylists', 'hasMorePlaylists', 'loadMorePlaylists']);
    playlistServiceStub.getPlaylists.and.returnValue(of(playlistResult));

    TestBed.configureTestingModule({
      declarations: [PlaylistGridComponent, PlaylistCardComponent],
      imports: [
        MatCardModule,
        MatGridListModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        RouterTestingModule,
        InfiniteScrollModule
      ],
      providers: [
        { provide: PlaylistService, useValue: playlistServiceStub }
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistGridComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', (a) => {
    expect(component).toBeTruthy();
    a();
  });

  it('should display 0 playlist cards', (done) => {
    const gridCompDe: DebugElement = fixture.debugElement;
    const cards = gridCompDe.queryAll(By.directive(PlaylistCardComponent));
    expect(cards.length).toEqual(0);
    done();
  });

  it('should display 2 playlist cards', () => {
    // Arrange
    const gridCompDe: DebugElement = fixture.debugElement;
    const playlist1: Playlist = new Playlist(1, 'playlist1');
    const playlist2: Playlist = new Playlist(2, 'playlist1');
    playlistResult.data = [playlist1, playlist2];

    // Act
    fixture.detectChanges();

    // Assert
    const cards = gridCompDe.queryAll(By.directive(PlaylistCardComponent));

    expect(cards.length).toEqual(2);
  });

  describe('loadMorePlaylists', () => {
    it('should call loadMorePlaylists', () => {
      // Arrange
      playlistServiceStub.loadMorePlaylists.and.returnValue(of(new PlaylistResult([], 0, '')));

      // Act
      component.loadMorePlaylists();

      // Assert
      expect(playlistServiceStub.loadMorePlaylists).toHaveBeenCalled();
    });

    it('should not call loadMorePlaylists', () => {
      // Arrange
      component.loading = true;

      // Act
      component.loadMorePlaylists();

      // Assert
      expect(playlistServiceStub.loadMorePlaylists).not.toHaveBeenCalled();
    });
  });
});
