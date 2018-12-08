import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Playlist } from './playlist';
import { PlaylistResult } from './playlist-result';
import { TrackResult } from './track-result';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlistResult: BehaviorSubject<PlaylistResult>;
  private tracksResult: BehaviorSubject<TrackResult>;

  constructor(private http: HttpClient) {
    this.playlistResult = new BehaviorSubject<PlaylistResult>(null);
    this.tracksResult = new BehaviorSubject<TrackResult>(null);
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

  getPlaylist(playlistId: Number = 273953): Observable<Playlist> {
    return this.http.get<Playlist>(`${environment.apiUrl}/playlist/${playlistId}`);
  }

  getPlaylistTracks(playlistId: Number = 273953): Observable<TrackResult> {
    return this.http.get<TrackResult>(`${environment.apiUrl}/playlist/${playlistId}/tracks`)
      .pipe(switchMap((tracksResult: TrackResult) => {
        this.tracksResult.next(tracksResult);
        return this.tracksResult.asObservable();
      }));
  }

  hasMorePlaylistTracks(): boolean {
    return !!this.playlistResult.getValue() && (this.playlistResult.getValue().next != null);
  }

  loadMorePlaylistTracks(): Observable<TrackResult> {
    if (this.hasMorePlaylistTracks()) {
      const nextObservable = this.http.get<TrackResult>(this.tracksResult.getValue().next);
      const subscription = nextObservable.subscribe((newResult: TrackResult) => {
        newResult.data = this.tracksResult.getValue().data.concat(newResult.data);
        this.tracksResult.next(newResult);

        subscription.unsubscribe();
      });
      return nextObservable;
    }
  }
}
