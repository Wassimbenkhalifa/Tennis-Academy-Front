import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Role} from 'src/app/role/role.model';
import {environment} from 'src/environments/environment';
import {User} from './user.model';
import {Cours} from "../../cours/all-cours/cours.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private Url = environment.apiUrl + 'auth';
  IMG_BASE_URL = environment.IMG_BASE_URL;
  isTblLoading = true;
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {

  }

  get data(): any[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  // @ts-ignore
  /** CRUD METHODS */
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.Url);
  }

  getAllUtilisateurs(): void {
    this.httpClient.get<User[]>(this.Url).subscribe(
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

  getAllActiveAdmins(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.Url + '/admin');
  }

  getAllActiveEntraineurs(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.Url + '/coach');
  }

  getAllActiveJoueurs(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.Url + '/adherent');
  }

  getAllRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(environment.apiUrl + "role");
  }

  // DEMO ONLY, you can find working methods below
  addUtilisateur(utilisateur: User): Observable<User> {
    this.dialogData = utilisateur;
    console.log(utilisateur);
    return this.httpClient.post<User>(this.Url + "/signup", utilisateur);
  }

  updateUtilisateur(utilisateur: User): Observable<User> {
    this.dialogData = utilisateur;
    // console.log(utilisateur);
    return this.httpClient.put<User>(this.Url + '/edit', utilisateur);
  }

  deleteUtilisateur(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.Url + '/' + id);
  }

  public getImageByUrl(imageName: string): Observable<any> {
    return this.httpClient.get(this.IMG_BASE_URL + 'media/' + imageName, {responseType: 'blob'});
  }


  public changeUtilisateurDispoById(utilisateurId: number, status: boolean): Observable<boolean> {
    return this.httpClient.put<boolean>(this.Url + '/changeDispo/' + utilisateurId, status);
  }


  public getAllAdherent(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.Url + "/adherent");
  }
  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.Url );
  }

}
