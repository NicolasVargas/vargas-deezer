import { Component, OnInit, Input } from '@angular/core';
import { Playlist } from '../playlist';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss']
})
export class PlaylistCardComponent implements OnInit {
  @Input() playlist: Playlist
  constructor() { }

  ngOnInit() {
  }

}
