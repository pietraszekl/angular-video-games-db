import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { forkJoin, map, Observable } from 'rxjs';
import { Game, APIResponse, GameDetails } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<GameDetails>> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<GameDetails>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/screenshots`
    );
    return forkJoin([
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    ]).pipe(
      map((resp: any) => {
        return {
          details: resp[0],
          screenshots: resp[1]?.results,
          trailers: resp[2]?.results,
        };
      })
    );
  }
}
