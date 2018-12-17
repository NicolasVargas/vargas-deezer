import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserResult } from './user-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  searchUser(query: string): Observable<UserResult> {
    const limit = 15;
    let params = new HttpParams();
    params = params.set('q', query);
    params = params.set('limit', limit.toString());
    return this.http.get<UserResult>(`${environment.apiUrl}/search/user`, { params: params });
  }
}
