import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistGridComponent } from './playlist-grid/playlist-grid.component';
import { PlaylistRoutingModule } from './playlist-routing.module';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { MatCardModule, MatButtonModule, MatGridList, MatGridListModule } from '@angular/material';
import { PlaylistCardComponent } from './playlist-card/playlist-card.component';

@NgModule({
  declarations: [PlaylistGridComponent, PlaylistDetailComponent, PlaylistCardComponent],
  imports: [
    CommonModule,
    PlaylistRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule
  ]
})
export class PlaylistModule { }
