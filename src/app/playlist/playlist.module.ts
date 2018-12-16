import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatGridListModule,
  MatIconModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatRippleModule, MatTableModule, MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlaylistCardComponent } from './playlist-card/playlist-card.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { PlaylistGridComponent } from './playlist-grid/playlist-grid.component';
import { PlaylistRoutingModule } from './playlist-routing.module';

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
    MatTableModule,
    BrowserAnimationsModule
  ]
})
export class PlaylistModule { }
