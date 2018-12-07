import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistGridComponent } from './playlist-grid.component';
import { MatCardModule, MatButtonModule, MatGridListModule, MatIconModule } from '@angular/material';
import { PlaylistService } from '../playlist.service';
import { of } from 'rxjs';
import { PlaylistCardComponent } from '../playlist-card/playlist-card.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Playlist } from '../playlist';
import { PlaylistResult } from '../playlist-result';

describe('PlaylistGridComponent', () => {
  let component: PlaylistGridComponent;
  let fixture: ComponentFixture<PlaylistGridComponent>;

  let playlistResult: PlaylistResult;
  let playlistServiceStub;

  beforeEach(async(() => {
    playlistResult = new PlaylistResult([], '', 0);

    playlistServiceStub = jasmine.createSpyObj<PlaylistService>('PlaylistService', ['getPlaylists', 'hasNext', 'getNext']);
    playlistServiceStub.getPlaylists.and.returnValue(of(playlistResult));

    TestBed.configureTestingModule({
      declarations: [PlaylistGridComponent, PlaylistCardComponent],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatIconModule
      ],
      providers: [
        { provide: PlaylistService, useValue: playlistServiceStub }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PlaylistGridComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 0 playlist cards', () => {
    const gridCompDe: DebugElement = fixture.debugElement;
    const cards = gridCompDe.queryAll(By.directive(PlaylistCardComponent));
    expect(cards.length).toEqual(0);
  });

  it('should display 2 playlist cards', () => {
    // Arrange
    const gridCompDe: DebugElement = fixture.debugElement;
    const playlist1: Playlist = new Playlist(1, 'p1', 'psm', 'pmd', 'playlist1', 'tracks', 1);
    const playlist2: Playlist = new Playlist(2, 'p1', 'psm', 'pmd', 'playlist2', 'tracks', 4);
    playlistResult.data = [playlist1, playlist2]

    // Act
    fixture.detectChanges();

    // Assert
    const cards = gridCompDe.queryAll(By.directive(PlaylistCardComponent));

    expect(cards.length).toEqual(2);
  });

  describe('getNext', () => {
    it('should call getNext', () => {
      // Arrange
      playlistServiceStub.getNext.and.returnValue(of(new PlaylistResult([], '', 0)));

      // Act
      component.getNext();

      // Assert
      expect(playlistServiceStub.getNext).toHaveBeenCalled();
    });

    it('should not call getNext', () => {
      // Arrange
      component.loading = true;

      // Act
      component.getNext();

      // Assert
      expect(playlistServiceStub.getNext).not.toHaveBeenCalled();
    });
  });
});
