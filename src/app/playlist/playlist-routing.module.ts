import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistGridComponent } from './playlist-grid/playlist-grid.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { PlaylistResolver } from './playlist-resolver';
import { UserIdentityGuard } from './user-identity-guard';

const routes: Routes = [
    { path: 'playlists/:userId', component: PlaylistGridComponent, canActivate: [UserIdentityGuard] },
    {
        path: 'playlists/:id/details',
        component: PlaylistDetailComponent,
        resolve: {
            playlist: PlaylistResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [PlaylistResolver]
})
export class PlaylistRoutingModule { }
