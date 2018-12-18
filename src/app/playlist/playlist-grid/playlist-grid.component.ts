import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { PlaylistService } from '../playlist.service';
import { Playlist } from '../playlist';
import { first, takeUntil, take, switchMap } from 'rxjs/operators';
import { PlaylistResult } from '../playlist-result';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';

@Component({
  selector: 'app-playlist-grid',
  templateUrl: './playlist-grid.component.html',
  styleUrls: ['./playlist-grid.component.scss']
})
export class PlaylistGridComponent implements OnInit {
  playlistResult: PlaylistResult;
  loading: boolean;

  constructor(private playlistService: PlaylistService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      first(),
      switchMap((params: ParamMap) => this.playlistService.getPlaylists(+params.get('userId')))
    ).subscribe((playlistResult: PlaylistResult) => this.playlistResult = playlistResult);
  }

  loadMorePlaylists() {
    if (!this.loading) {
      this.loading = true;
      this.playlistService.loadMorePlaylists(this.playlistResult)
        .pipe(first())
        .subscribe((playlistResult: PlaylistResult) => {
          this.loading = false;

          playlistResult.data = this.playlistResult.data.concat(playlistResult.data);
          this.playlistResult = playlistResult;
        });
    }
  }

  reachedEnd() {
    return !this.playlistService.hasMorePlaylists(this.playlistResult);
  }

}
