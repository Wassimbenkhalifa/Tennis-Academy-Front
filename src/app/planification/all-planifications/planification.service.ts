import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Cours} from 'src/app/cours/all-cours/cours.model';
import {environment} from 'src/environments/environment';
import {Planification} from './planification.model';


@Injectable({
  providedIn: 'root'
})
export class PlanificationService {
  private Url = environment.apiUrl + 'planification';
  isTblLoading = true;
  dataChange: BehaviorSubject<Planification[]> = new BehaviorSubject<Planification[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): Planification[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllPlanifications(): void {
    this.httpClient.get<Planification[]>(this.Url).subscribe(
      (data) => {
        console.log(data);
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
  addPlanification(planification: Planification): Observable<Planification> {
    this.dialogData = planification;
    return this.httpClient.post<Planification>(this.Url, planification);
  }

  updatePlanification(planification: Planification): Observable<Planification> {
    this.dialogData = planification;
    console.log(planification);
    return this.httpClient.put<Planification>(this.Url + '/edit', planification);
  }

  deletePlanification(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.Url + '/' + id);
  }


  getAllCours(): Observable<Cours[]> {
    return this.httpClient.get<Cours[]>(environment.apiUrl + "cours");
  }

  getAllPlans(): Observable<any> {
    return this.httpClient.get<Planification[]>(this.Url);
  }

}
