import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Publication} from './publication.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private Url = environment.apiUrl + 'publication';
  IMG_BASE_URL = environment.IMG_BASE_URL;

  constructor(private httpClient: HttpClient) {
  }

  getAllPublications(): Observable<Publication[]> {
    return this.httpClient.get<Publication[]>(this.Url);

  }
}
