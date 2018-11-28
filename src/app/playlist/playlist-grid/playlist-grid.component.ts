import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-playlist-grid',
  templateUrl: './playlist-grid.component.html',
  styleUrls: ['./playlist-grid.component.scss']
})
export class PlaylistGridComponent implements OnInit {
  playlists: Observable<any>;


  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.playlistService.getPlaylists()
      .subscribe((data) => {
        console.log(data.data);
      })
  }

}
