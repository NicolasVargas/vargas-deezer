import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { PlaylistGridComponent } from './playlist-grid/playlist-grid.component';
import { PlaylistResolver } from './playlist-resolver';
import { PlaylistsResolver } from './playlists-resolver';
import { TracksResolver } from './tracks-resolver';

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
            playlist: PlaylistResolver,
            trackResult: TracksResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [PlaylistResolver, PlaylistsResolver, TracksResolver]
})
export class PlaylistRoutingModule { }
