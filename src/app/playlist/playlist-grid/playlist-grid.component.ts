import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistService } from '../playlist.service';
import { Playlist } from '../playlist';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-playlist-grid',
  templateUrl: './playlist-grid.component.html',
  styleUrls: ['./playlist-grid.component.scss']
})
export class PlaylistGridComponent implements OnInit {
  playlists: Observable<Playlist[]>;
  loadingNext: boolean;


  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.playlists = this.playlistService.getPlaylists();
  }

  getNext() {
    if (!this.playlistService.loading) {
      this.playlistService.getNext();
    }
  }

  hasNext() {
    return !this.playlistService.hasNext();
  }

}
