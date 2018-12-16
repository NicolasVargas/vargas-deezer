import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatGridListModule, MatIconModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Playlist } from '../playlist';
import { PlaylistCardComponent } from './playlist-card.component';


describe('PlaylistCardComponent', () => {
  let component: PlaylistCardComponent;
  let fixture: ComponentFixture<PlaylistCardComponent>;
  let mockedPlaylist: Playlist;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistCardComponent],
      imports: [
        RouterTestingModule,
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

    mockedPlaylist = new Playlist(0, 'my playlist');

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
