import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private Url = environment.apiUrl + 'auth';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // getAdminInfo(): Observable<any> {
  //   return this.http.get<User>(this.Url + "/infoAdmin");
  // }

  getUtilisateur(idUser: number): Observable<User> {
    return this.http.get<User>(this.Url + "/" + idUser);
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}auth/signin`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  signup(username: string, email: string, password: string, prenom: string, nom: string,
         addresse: string, telephone: number) {
    return this.http
      .post<any>(`${environment.apiUrl}auth/signup`, {
        username,
        email,
        prenom,
        nom,
        password,
        addresse,
        telephone
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return of({success: false});
  }
}
