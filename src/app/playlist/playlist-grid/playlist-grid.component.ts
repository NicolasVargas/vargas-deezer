import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { first, switchMap } from 'rxjs/operators';
import { PlaylistResult } from '../playlist-result';
import { PlaylistService } from '../playlist.service';


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

  onScrollDown() {
    if (this.playlistService.hasMorePlaylists(this.playlistResult)) {
      this.loadMorePlaylists();
    }
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
}
