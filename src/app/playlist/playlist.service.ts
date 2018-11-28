import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) { }

  getPlaylists(userId: Number = 5) : Observable<any>{
    return this.http.get(`/api/user/${userId}/playlists`)
  }
}
