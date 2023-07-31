import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Planification} from 'src/app/planification/all-planifications/planification.model';
import {Terrain} from 'src/app/terrain/all-terrain/terrain.model';
import {environment} from 'src/environments/environment';
import {Seance} from './/Seance.model';
import {User} from "../../user/all-user/user.model";

@Injectable({
  providedIn: 'root'
})
export class SeanceService {
  private Url = environment.apiUrl + 'seance';
  isTblLoading = true;
  dataChange: BehaviorSubject<Seance[]> = new BehaviorSubject<Seance[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {

  }

  get data(): Seance[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllSeances(): void {
    this.httpClient.get<Seance[]>(this.Url).subscribe(
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

  getAllSessions(): Observable<Seance[]> {
    return this.httpClient.get<Seance[]>(this.Url);
  }

  addSeance(seance: Seance):any {
    // this.dialogData = seance;
     this.httpClient.post<Seance>(this.Url + '/add', seance).subscribe(data => {
       if (data) {
         console.log(data);
         // this.dialogData = data;
         this.dataChange.value[data.idSeance] = data;
       }
     });
  }

  updateSeance(seance: Seance): Observable<Seance> {
    this.dialogData = seance;
    return this.httpClient.put<Seance>(this.Url + '/edit', seance);
  }

  deleteSeance(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.Url + '/' + id);
  }

  getAllPlanification(): Observable<Planification[]> {
    return this.httpClient.get<Planification[]>(environment.apiUrl + "planification");
  }

  getAllTerrain(): Observable<Terrain[]> {
    return this.httpClient.get<Terrain[]>(environment.apiUrl + "terrain");
  }

}
