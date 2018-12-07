import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PlaylistResult } from './playlist-result';
import { Playlist } from './playlist';
import { TrackResult } from './track-result';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private _playlistResult: BehaviorSubject<PlaylistResult>;
  private _tracksResult: BehaviorSubject<TrackResult>;

  constructor(private http: HttpClient) {
    this._playlistResult = new BehaviorSubject<PlaylistResult>(null);
  }

  /**
   * Fetch a brand new playlists page
   */
  getPlaylists(userId: Number = 5): Observable<PlaylistResult> {
    return this.http.get<PlaylistResult>(`https://api.deezer.com/user/${userId}/playlists`)
      .pipe(switchMap((playlistResult: PlaylistResult) => {
        this._playlistResult.next(playlistResult);
        return this._playlistResult.asObservable();
      }));
  }

  hasMorePlaylists(): boolean {
    return !!this._playlistResult.getValue() && (this._playlistResult.getValue().next != null);
  }

  loadMorePlaylists(): Observable<PlaylistResult> {
    if (this.hasMorePlaylists()) {
      const nextObservable = this.http.get<PlaylistResult>(this._playlistResult.getValue().next);
      const subscription = nextObservable.subscribe((newResult: PlaylistResult) => {
        newResult.data = this._playlistResult.getValue().data.concat(newResult.data);
        this._playlistResult.next(newResult);

        subscription.unsubscribe();
      });
      return nextObservable;
    }
  }

  getPlaylist(playlistId: Number = 273953): Observable<Playlist> {
    return this.http.get<Playlist>(`https://api.deezer.com/playlist/${playlistId}`);
  }

  getPlaylistTracks(playlistId: Number = 273953): Observable<TrackResult> {
    return this.http.get<TrackResult>(`https://api.deezer.com/playlist/${playlistId}/tracks`)
      .pipe(switchMap((tracksResult: TrackResult) => {
        this._tracksResult.next(tracksResult);
        return this._tracksResult.asObservable();
      }));
  }

  hasMorePlaylistTracks(): boolean {
    return !!this._playlistResult.getValue() && (this._playlistResult.getValue().next != null);
  }

  loadMorePlaylistTracks(): Observable<TrackResult> {
    if (this.hasMorePlaylistTracks()) {
      const nextObservable = this.http.get<TrackResult>(this._tracksResult.getValue().next);
      const subscription = nextObservable.subscribe((newResult: TrackResult) => {
        newResult.data = this._tracksResult.getValue().data.concat(newResult.data);
        this._tracksResult.next(newResult);

        subscription.unsubscribe();
      });
      return nextObservable;
    }
  }
}
