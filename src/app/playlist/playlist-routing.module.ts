import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistGridComponent } from './playlist-grid/playlist-grid.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';

const routes: Routes = [
    { path: 'playlists', component: PlaylistGridComponent },
    { path: 'playlists/detail', component: PlaylistDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlaylistRoutingModule { }
