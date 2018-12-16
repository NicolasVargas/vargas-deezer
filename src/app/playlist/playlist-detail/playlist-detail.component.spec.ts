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


describe('PlaylistDetailComponent', () => {
  let component: PlaylistDetailComponent;
  let fixture: ComponentFixture<PlaylistDetailComponent>;

  beforeEach(async(() => {
    const mockedActivateRoute = {
      snapshot: {
        data: {
          playlist: new Playlist(0, 'Playlist Title', '', '', '', '/tracks', 2, 5, [], { name: 'author' })
        }
      }
    };
    const playlistTracks: TrackResult = new TrackResult([], 0);

    const playlistServiceStub = jasmine.createSpyObj<PlaylistService>('PlaylistService',
      ['getPlaylistTracks']);
    playlistServiceStub.getPlaylistTracks.and.returnValue(of(playlistTracks));

    TestBed.configureTestingModule({
      declarations: [PlaylistDetailComponent],
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule,
        MatProgressSpinnerModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockedActivateRoute },
        { provide: PlaylistService, useValue: playlistServiceStub }
      ]
    })
      .compileComponents();
    const activatedRoute = TestBed.get(ActivatedRoute);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
