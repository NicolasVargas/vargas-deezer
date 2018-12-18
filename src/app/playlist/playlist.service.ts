import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Playlist } from './playlist';
import { PlaylistResult } from './playlist-result';
import { TrackResult } from './track-result';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) { }

  /**
   * Fetch a brand new playlists page
   */
  getPlaylists(userId: Number): Observable<PlaylistResult> {
    return this.http.get<PlaylistResult>(`${environment.apiUrl}/user/${userId}/playlists`);
  }

  hasMorePlaylists(playlistResult: PlaylistResult): boolean {
    return playlistResult.next != null;
  }

  loadMorePlaylists(playlistResult: PlaylistResult): Observable<PlaylistResult> {
    if (this.hasMorePlaylists(playlistResult)) {
      return this.http.get<PlaylistResult>(playlistResult.next);
    }
  }

  getPlaylist(playlistId: Number): Observable<Playlist> {
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
