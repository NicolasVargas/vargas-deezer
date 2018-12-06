import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, first } from 'rxjs/operators';
import { PlaylistService } from '../playlist.service';
import { Observable } from 'rxjs';
import { Playlist } from '../playlist';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit {
  playlist: Playlist;
  columnsToDisplay  = ['title'];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playlistService: PlaylistService
  ) { }

  ngOnInit() {
    const playlistObservable = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.playlistService.getPlaylist((+params.get('id'))).pipe(
          first()
        )
      )
    );
    playlistObservable.subscribe(data => this.playlist = data);
  }

}
