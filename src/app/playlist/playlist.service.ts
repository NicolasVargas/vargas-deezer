import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PlaylistResult } from './playlist-result';
import { Playlist } from './playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private _playlistResult: BehaviorSubject<PlaylistResult>;

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

  getPlaylist(playlistId: Number = 273953) {
    return this.http.get<Playlist>(`https://api.deezer.com/playlist/${playlistId}`);
  }

  getPlaylist(playlistId: Number = 273953) {
    return this.http.get<Playlist>(`/api/playlist/${playlistId}`);
  }

  hasNext(): boolean {
    return !!this._playlistResult.getValue() && (this._playlistResult.getValue().next != null);
  }

  getNext(): Observable<PlaylistResult> {
    if (this.hasNext()) {
      const nextObservable = this.http.get<PlaylistResult>(this._playlistResult.getValue().next);
      const subscription = nextObservable.subscribe((newResult: PlaylistResult) => {
          newResult.data = this._playlistResult.getValue().data.concat(newResult.data);
          this._playlistResult.next(newResult);

          subscription.unsubscribe();
        });
      return nextObservable;
    }
  }
}
