import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistGridComponent } from './playlist-grid.component';
import { MatCardModule, MatButtonModule, MatGridListModule, MatIconModule } from '@angular/material';
import { PlaylistService } from '../playlist.service';
import { of } from 'rxjs';
import { PlaylistCardComponent } from '../playlist-card/playlist-card.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Playlist } from '../playlist';

describe('PlaylistGridComponent', () => {
  let component: PlaylistGridComponent;
  let fixture: ComponentFixture<PlaylistGridComponent>;

  let playlist;
  let playlistServiceStub;

  beforeEach(async(() => {
    playlist = [];

    playlistServiceStub = jasmine.createSpyObj<PlaylistService>('PlaylistService', ['getPlaylists', 'hasNext', 'getNext']);
    playlistServiceStub.getPlaylists.and.returnValue(of(playlist));

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
    const playlist1: Partial<Playlist> = {};
    const playlist2: Partial<Playlist> = {};
    playlist.push(playlist1, playlist2);

    fixture.detectChanges();

    const gridCompDe: DebugElement = fixture.debugElement;
    const cards = gridCompDe.queryAll(By.directive(PlaylistCardComponent));

    expect(cards.length).toEqual(2);
  });

  describe('getNext', () => {
    it('should call getNext', () => {
      // Arrange
      TestBed.get(PlaylistService).loading = false;
      // playlistServiceStub.loading = false;
      fixture.detectChanges();

      // Act
      component.getNext();

      // Assert
      expect(playlistServiceStub.getNext).toHaveBeenCalled();
    });

    it('should not call getNext', () => {
      // Arrange
      TestBed.get(PlaylistService).loading = true;
      fixture.detectChanges();

      // Act
      component.getNext();

      // Assert
      expect(playlistServiceStub.getNext).not.toHaveBeenCalled();
    });
  });
});
