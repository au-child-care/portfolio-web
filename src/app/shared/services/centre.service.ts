import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { CentreDetails } from '../dtos';
import { ApiHttpClient } from '../utilities';

@Injectable({ providedIn: 'root' })
export class CentreService {

  private basePath = 'centre';

  constructor(
    private http: ApiHttpClient) { }

  getCentre(id: number): Observable<CentreDetails> {
    return this.http.get<CentreDetails>(`${this.basePath}/${id}`);
  }

  updateCentre(centre: CentreDetails): Observable<CentreDetails> {
    return this.http.put<CentreDetails>(`${this.basePath}/${centre.id}`, centre);
  }
}
