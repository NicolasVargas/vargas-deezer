import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { Playlist } from './playlist';
import { PlaylistService } from './playlist.service';

@Injectable()
export class PlaylistResolver implements Resolve<Playlist> {

    constructor(private playlistService: PlaylistService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Playlist> {
        return this.playlistService.getPlaylist(+route.paramMap.get('id'));
    }

}