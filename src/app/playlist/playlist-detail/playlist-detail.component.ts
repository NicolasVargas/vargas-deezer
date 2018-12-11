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


  columnsToDisplay = ['index', 'title', 'duration', 'artist'];
  pageSizeOptions = [20, 50, 100];
  pageSize = this.pageSizeOptions[0];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService
  ) { }

  ngOnInit() {
    this.playlist = this.route.snapshot.data.playlist;
    this.loadTracks(this.playlist.tracklist, this.pageSize);
  }

  loadTracks(tracklist: string, pageSize?: number) {
    this.loading = true;
    this.playlistService.getPlaylistTracks(tracklist, pageSize)
      .pipe(
        takeUntil(this.destroySubject),
        catchError(() => of([])),
        finalize(() => this.loading = false)
      )
      .subscribe((trackResult: TrackResult) => {
        this.trackResult = trackResult;
      });
  }

  ngAfterViewInit() {

    this.paginator.page.pipe(
      takeUntil(this.destroySubject),
    ).subscribe((pageEvent: PageEvent) => {
      const paginationAction: number = pageEvent.pageIndex - pageEvent.previousPageIndex;
      if (paginationAction > 0) {
        this.loadTracks(this.trackResult.next);
      } else if (paginationAction < 0) {
        this.loadTracks(this.trackResult.prev);
      }
    });
  }

  ngOnDestroy() {
    this.destroySubject.next(true);
    this.destroySubject.unsubscribe();
  }
}
