import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistService } from '../playlist.service';
import { Playlist } from '../playlist';
import { PlaylistResult } from '../playlist-result';

@Component({
  selector: 'app-playlist-grid',
  templateUrl: './playlist-grid.component.html',
  styleUrls: ['./playlist-grid.component.scss']
})
export class PlaylistGridComponent implements OnInit {
  playlistResult: Observable<PlaylistResult>;


  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.playlistResult = this.playlistService.getPlaylists();
  }

}
