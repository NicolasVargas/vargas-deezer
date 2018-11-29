import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlaylistResult } from './playlist-result';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) { }

  getPlaylists(userId: Number = 5) : Observable<PlaylistResult>{
    return this.http.get<PlaylistResult>(`/api/user/${userId}/playlists`)
  }
}
