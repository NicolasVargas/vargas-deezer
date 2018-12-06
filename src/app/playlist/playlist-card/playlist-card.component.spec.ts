import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCardComponent } from './playlist-card.component';
import { MatGridListModule, MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { Playlist } from '../playlist';
import { By } from '@angular/platform-browser';

describe('PlaylistCardComponent', () => {
  let component: PlaylistCardComponent;
  let fixture: ComponentFixture<PlaylistCardComponent>;
  let mockedPlaylist: Playlist;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistCardComponent],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatIconModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistCardComponent);
    component = fixture.componentInstance;

    mockedPlaylist = new Playlist(0, 'pic', 'pic_small', 'pic_medium', 'my playlist', 'my tracklist', 15);

    component.playlist = mockedPlaylist;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title of the playlist', () => {
    const titleDebugElement = fixture.debugElement.query(By.css('mat-card-title'));
    const titlElement: HTMLElement = titleDebugElement.nativeElement;
    expect(titlElement.textContent).toEqual(mockedPlaylist.title);
  });

});
