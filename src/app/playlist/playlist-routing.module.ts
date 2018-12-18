import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistGridComponent } from './playlist-grid/playlist-grid.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { PlaylistResolver } from './playlist-resolver';
import { UserIdentityGuard } from './user-identity-guard';
import { PlaylistsResolver } from './playlists-resolver';

const routes: Routes = [
    {
        path: ':userId/playlists',
        component: PlaylistGridComponent,
        // canActivate: [UserIdentityGuard],
        resolve: {
            user: PlaylistsResolver
        }
    },
    {
        path: ':userId/playlists/:id',
        component: PlaylistDetailComponent,
        resolve: {
            playlist: PlaylistResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [PlaylistResolver, PlaylistsResolver]
})
export class PlaylistRoutingModule { }
