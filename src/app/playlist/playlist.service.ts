import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
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

  getPlaylists(userId: Number = 5): Observable<Playlist[]> {
    this.loading = true;
    this.http.get<PlaylistResult>(`/api/user/${userId}/playlists`)
      .pipe(first())
      .subscribe((newResult: PlaylistResult) => {
        this.loading = false;
        this.setNewPlaylistResult(newResult);
        this._playlists.next(this._lastPlaylistResult.data);
      });
    return this._playlists.asObservable();
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
          this.setNewPlaylistResult(newResult);
          this._playlists.next(this._playlists.getValue().concat(this._lastPlaylistResult.data));
        });
    }
  }

  private setNewPlaylistResult(newResult: PlaylistResult) {
    this._lastPlaylistResult = newResult;
    if (this._lastPlaylistResult.next != null) {
      this._lastPlaylistResult.next = this._lastPlaylistResult.next.replace('https://api.deezer.com/', '/api/');
    }
  }
}
