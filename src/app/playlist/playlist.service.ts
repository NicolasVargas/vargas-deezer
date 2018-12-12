import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Playlist } from './playlist';
import { PlaylistResult } from './playlist-result';
import { TrackResult } from './track-result';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlistResult: BehaviorSubject<PlaylistResult>;

  constructor(private http: HttpClient) {
    this.playlistResult = new BehaviorSubject<PlaylistResult>(null);
  }

  /**
   * Fetch a brand new playlists page
   */
  getPlaylists(userId: Number = 5): Observable<PlaylistResult> {
    return this.http.get<PlaylistResult>(`${environment.apiUrl}/user/${userId}/playlists`)
      .pipe(switchMap((playlistResult: PlaylistResult) => {
        this.playlistResult.next(playlistResult);
        return this.playlistResult.asObservable();
      }));
  }

  hasMorePlaylists(): boolean {
    return !!this.playlistResult.getValue() && (this.playlistResult.getValue().next != null);
  }

  loadMorePlaylists(): Observable<PlaylistResult> {
    if (this.hasMorePlaylists()) {
      const nextObservable = this.http.get<PlaylistResult>(this.playlistResult.getValue().next);
      const subscription = nextObservable.subscribe((newResult: PlaylistResult) => {
        newResult.data = this.playlistResult.getValue().data.concat(newResult.data);
        this.playlistResult.next(newResult);

        subscription.unsubscribe();
      });
      return nextObservable;
    }
  }

  getPlaylist(playlistId: Number = 908622995): Observable<Playlist> {
    return this.http.get<Playlist>(`${environment.apiUrl}/playlist/${playlistId}`);
  }

  getPlaylistTracks(playlist: Playlist, limit?: number, index?: number): Observable<TrackResult> {
    let params = new HttpParams();
    if (index) {
      params = params.set('index', index.toString());
    }
    if (limit) {
      params = params.set('limit', limit.toString());
    }
    return this.http.get<TrackResult>(playlist.tracklist, { params: params });
  }
}
