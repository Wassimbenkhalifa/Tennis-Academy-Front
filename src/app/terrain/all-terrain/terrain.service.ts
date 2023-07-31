import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Terrain} from './terrain.model';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {
  private Url = environment.apiUrl + 'terrain';
  IMG_BASE_URL = environment.IMG_BASE_URL;
  isTblLoading = true;
  dataChange: BehaviorSubject<Terrain[]> = new BehaviorSubject<Terrain[]>([]);
// Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): Terrain[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllTerrains(): any {
    this.httpClient.get<Terrain[]>(this.Url).subscribe(
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

  getAllStadiums(): any {
    return this.httpClient.get<Terrain[]>(this.Url);
  }

  getAllActiveTerrains(): Observable<Terrain[]> {
    return this.httpClient.get<Terrain[]>(this.Url + '/active');
  }

// DEMO ONLY, you can find working methods below
  addTerrain(terrain: Terrain): Observable<Terrain> {
    this.dialogData = terrain;
    return this.httpClient.post<Terrain>(this.Url, terrain);
  }

  updateTerrain(terrain: Terrain): Observable<Terrain> {
    this.dialogData = terrain;
    console.log(terrain);
    return this.httpClient.put<Terrain>(this.Url + '/edit', terrain);
  }

  deleteTerrain(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.Url + '/' + id);
  }

  public getImageByUrl(imageName: string): Observable<any> {
    return this.httpClient.get(this.IMG_BASE_URL + 'media/' + imageName, {responseType: 'blob'});
  }


  public changeTerrainDispoById(TerrainId: number, status: boolean): Observable<boolean> {
    return this.httpClient.put<boolean>(this.Url + '/changeDispo/' + TerrainId, status);
  }

}
