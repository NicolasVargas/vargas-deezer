import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatIconModule,
  MatProgressSpinnerModule, MatRippleModule, MatTableModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PlaylistCardComponent } from './playlist-card/playlist-card.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { PlaylistGridComponent } from './playlist-grid/playlist-grid.component';
import { PlaylistRoutingModule } from './_routing/playlist-routing.module';

@NgModule({
  declarations: [PlaylistGridComponent, PlaylistDetailComponent, PlaylistCardComponent],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    PlaylistRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatTableModule,
    BrowserAnimationsModule
  ]
})
export class PlaylistModule { }
