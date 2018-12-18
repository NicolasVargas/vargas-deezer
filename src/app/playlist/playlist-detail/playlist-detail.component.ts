import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { Playlist } from '../playlist';
import { PlaylistService } from '../playlist.service';
import { TrackResult } from '../track-result';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  destroySubject: Subject<boolean> = new Subject<boolean>();
  loading: boolean;
  playlist: Playlist;
  trackResult: TrackResult;

  columnsToDisplay = ['title', 'duration', 'artist'];

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService
  ) { }

  ngOnInit() {
    this.playlist = this.route.snapshot.data.playlist;
    this.trackResult = this.route.snapshot.data.trackResult;
  }

  ngAfterViewInit() {
  }

  onScrollDown() {
    if (this.playlistService.hasMoreTracks(this.trackResult)) {
      this.playlistService.loadMoreTracks(this.trackResult)
        .pipe(takeUntil(this.destroySubject))
        .subscribe((trackResult: TrackResult) => {
          trackResult.data = this.trackResult.data.concat(trackResult.data);
          this.trackResult = trackResult;
        });
    }
  }

  ngOnDestroy() {
    this.destroySubject.next(true);
    this.destroySubject.unsubscribe();
  }
}
