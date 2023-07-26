import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiPost } from '@models/posts.model';
import { ConfigService } from '@services/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  api = this.configService.api + this.configService.endpoints.posts;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getActivePosts(): Observable<IApiPost[]> {
    return this.http.get<IApiPost[]>(
      this.configService.api + '/api/dashboard/posts/active-posts/'
    );
  }

  getAll(): Observable<IApiPost[]> {
    return this.http.get<IApiPost[]>(this.api);
  }

  getDetails(id: number): Observable<IApiPost> {
    return this.http.get<IApiPost>(this.api + id.toString() + '/');
  }

  put(id: number, data: IApiPost): Observable<IApiPost> {
    return this.http.put<IApiPost>(this.api + id.toString() + '/', data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(this.api + id.toString() + '/');
  }

  post(data: IApiPost): Observable<IApiPost> {
    return this.http.post<IApiPost>(this.api, data);
  }
}
