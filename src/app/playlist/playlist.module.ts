import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistGridComponent } from './playlist-grid/playlist-grid.component';
import { PlaylistRoutingModule } from './playlist-routing.module';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import {
  MatCardModule, MatButtonModule, MatIconModule,
  MatGridListModule, MatRippleModule, MatToolbarModule, MatTableModule,
  MatPaginatorModule, MatProgressSpinnerModule
} from '@angular/material';
import { PlaylistCardComponent } from './playlist-card/playlist-card.component';

@NgModule({
  declarations: [PlaylistGridComponent, PlaylistDetailComponent, PlaylistCardComponent],
  imports: [
    CommonModule,
    PlaylistRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatRippleModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule
  ]
})
export class PlaylistModule { }
