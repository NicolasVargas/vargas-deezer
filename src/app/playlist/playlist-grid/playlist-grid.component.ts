import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistService } from '../playlist.service';
import { Playlist } from '../playlist';
import { first, takeUntil } from 'rxjs/operators';
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
      const sub = this.playlistService.getNext()
      .subscribe(() => {
        this.loading = false;
        sub.unsubscribe();
      });
    }
  }

  hasNext() {
    return !this.playlistService.hasNext();
  }

}
