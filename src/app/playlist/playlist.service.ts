import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PlaylistResult } from './playlist-result';
import { Playlist } from './playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private _lastPlaylistResult: PlaylistResult;
  private _playlists: BehaviorSubject<Playlist[]>;
  public loading: boolean;

  constructor(private http: HttpClient) {
    this._playlists = new BehaviorSubject<Playlist[]>([]);
  }

  /**
   * Fetch a brand new playlists page
   */
  getPlaylists(userId: Number = 5): Observable<Playlist[]> {
    // avoid multiple calls
    this.loading = true;

    return this.http.get<PlaylistResult>(`https://api.deezer.com/user/${userId}/playlists`)
      .pipe(
        // Only take data once
        first(),
        // From Observable<PlaylistResult> to Observable<Playlist[]>
        switchMap((newResult: PlaylistResult) => {
          this.loading = false;
          this._lastPlaylistResult = newResult;
          // fill playlists subject with received list
          this._playlists.next(this._lastPlaylistResult.data);
          // Consumers will only need the list of playlists
          return this._playlists.asObservable();
        })
      );
  }

  getPlaylist(playlistId: Number = 273953) {
    return this.http.get<Playlist>(`/api/playlist/${playlistId}`);
  }

  hasNext(): boolean {
    return !!this._lastPlaylistResult && (this._lastPlaylistResult.next != null);
  }

  getNext() {
    if (!this.loading && this.hasNext()) {
      this.loading = true;
      this.http.get<PlaylistResult>(this._lastPlaylistResult.next)
        .pipe(first())
        .subscribe((newResult: PlaylistResult) => {
          this.loading = false;
          this._lastPlaylistResult = newResult;
          this._playlists.next(this._playlists.getValue().concat(this._lastPlaylistResult.data));
        });
    }
  }
}
