import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistGridComponent } from './playlist-grid.component';
import { MatCardModule, MatButtonModule, MatGridListModule } from '@angular/material';
import { PlaylistService } from '../playlist.service';
import { of } from 'rxjs';
import { PlaylistCardComponent } from '../playlist-card/playlist-card.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Playlist } from '../playlist';

describe('PlaylistGridComponent', () => {
  let component: PlaylistGridComponent;
  let fixture: ComponentFixture<PlaylistGridComponent>;
  let playlistService: PlaylistService;

  let getPlaylistsSpy;
  let playlistResult;

  beforeEach(async(() => {
    playlistResult = {
      data: []
    }

    const playlistService = jasmine.createSpyObj('PlaylistService', ['getPlaylists']);
    playlistService.getPlaylists.and.returnValue(of(playlistResult));

    TestBed.configureTestingModule({
      declarations: [PlaylistGridComponent, PlaylistCardComponent],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatGridListModule
      ],
      providers: [
        { provide: PlaylistService, useValue: playlistService }
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
    const gridComponentEl: HTMLElement = gridCompDe.nativeElement;
    const cards = gridCompDe.queryAll(By.directive(PlaylistCardComponent));
    expect(cards.length).toEqual(0);
  });

  it('should display 2 playlist cards', () => {
    const playlist1: Partial<Playlist> = {}
    const playlist2: Partial<Playlist> = {}
    playlistResult.data.push(playlist1, playlist2);

    fixture.detectChanges();

    const gridCompDe: DebugElement = fixture.debugElement;
    const gridComponentEl: HTMLElement = gridCompDe.nativeElement;
    const cards = gridCompDe.queryAll(By.directive(PlaylistCardComponent));

    expect(cards.length).toEqual(2);
  });
});
