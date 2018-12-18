import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PlaylistService } from './playlist.service';
import { TrackResult } from './track-result';

@Injectable()
export class TracksResolver implements Resolve<TrackResult> {

    constructor(private playlistService: PlaylistService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<TrackResult> {
        return this.playlistService.getTracks(+route.paramMap.get('id'));
    }

}
