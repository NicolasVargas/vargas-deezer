import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Playlist } from '../playlist';
import { PlaylistService } from '../playlist.service';
import { Track } from '../track';
import { TrackResult } from '../track-result';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
  playlist: Playlist;
  tracks: TrackResult;
  destroySubject: Subject<boolean> = new Subject<boolean>();
  columnsToDisplay = ['index', 'title', 'duration', 'artist'];
  tracksResult: Observable<TrackResult>;
  tracksDataSource = new MatTableDataSource<Track>([]);

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntil(this.destroySubject))
      .subscribe((params: ParamMap) => {
        let id: number = +params.get('id');

        // Fetch playlist details
        this.playlistService.getPlaylist(id)
          .pipe(takeUntil(this.destroySubject))
          .subscribe((playlist: Playlist) => {
            this.playlist = playlist;
          });

        // Fetch playlist tracks
        this.playlistService.getPlaylistTracks(id)
          .pipe(takeUntil(this.destroySubject))
          .subscribe((tracks: TrackResult) => {
            this.tracksDataSource.data = tracks.data;
          })
      })
  }

  ngOnDestroy() {
    this.destroySubject.next(true);
    this.destroySubject.unsubscribe();
  }
}
