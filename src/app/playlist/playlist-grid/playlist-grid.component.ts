import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { PlaylistService } from '../playlist.service';
import { Playlist } from '../playlist';
import { first, takeUntil, take } from 'rxjs/operators';
import { PlaylistResult } from '../playlist-result';

@Component({
  selector: 'app-playlist-grid',
  templateUrl: './playlist-grid.component.html',
  styleUrls: ['./playlist-grid.component.scss']
})
export class PlaylistGridComponent implements OnInit {
  playlistResult: Observable<PlaylistResult>;
  loading: boolean;


  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.playlistResult = this.playlistService.getPlaylists();
  }

  getNext() {
    if (!this.loading) {
      this.loading = true;
      this.playlistService.getNext()
        .pipe(first())
        .subscribe(() => {
          this.loading = false;
        });
    }
  }

  hasNext() {
    return !this.playlistService.hasNext();
  }

}
