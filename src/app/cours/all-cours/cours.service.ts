import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Cours} from './cours.model';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private Url = environment.apiUrl + 'cours';
  isTblLoading = true;
  dataChange: BehaviorSubject<Cours[]> = new BehaviorSubject<Cours[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): Cours[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllCours(): void {
    this.httpClient.get<Cours[]>(this.Url).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  // DEMO ONLY, you can find working methods below
  addCours(terrain: Cours): Observable<Cours> {
    this.dialogData = terrain;
    return this.httpClient.post<Cours>(this.Url, terrain);
  }

  updateCours(terrain: Cours): Observable<Cours> {
    // this.dialogData = terrain;
    // console.log(terrain);
    return this.httpClient.put<Cours>(this.Url + '/edit', terrain);
  }

  deleteCours(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.Url + '/' + id);
  }

}
