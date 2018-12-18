import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserResult } from './user-result';
import { Observable } from 'rxjs';
import { User } from '../core/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly MAX_USERS = 15;
  constructor(private http: HttpClient) { }

  searchUser(query: string): Observable<UserResult> {
    let params = new HttpParams();
    params = params.set('q', query);
    params = params.set('limit', this.MAX_USERS.toString());
    return this.http.get<UserResult>(`${environment.apiUrl}/search/user`, { params: params });
  }

  getUser(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/user/${id}`);
  }
}
