import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {HttpClient} from '@angular/common/http';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {BehaviorSubject, fromEvent, map, merge, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {DeleteFormComponent} from './dialogs/delete-form/delete-form.component';
import {FormDialogComponent} from './dialogs/form-dialog/form-dialog.component';
import {UserService} from './user.service';
import {User} from './user.model';
import {Router} from "@angular/router";


@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss']
})
export class AllUserComponent {
  IMG_BASE_URL = environment.IMG_BASE_URL;
  btnTous = "";
  btnAdmin = "";
  btnJou = "";
  btnEnt = "";

  displayedColumns = [
    'select',
    'id',
    'photo',
    'prenom',
    'nom',
    'email',
    'dateNaissance',
    'dateEngagement',
    'nbrMatchJoues',
    'rate',
    'gender',
    'verified',
    'actions',
  ];
  exampleDatabase: UserService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<User>(true, []);
  id: number;
  user: User | null;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public userService: UserService,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.btnTous = "primary";
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  showTous() {

  }

  showAdmin() {

  }

  showEnt() {

  }

  showJou() {

  }


  addNew() {
    this.router.navigate(['/utilisateurs/add-user']);
  }

  editCall(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        utilisateur: row,
        action: 'editer',
      },

      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        console.log(result);
        // When using an edit things are little different, firstly we find record inside DataService by id

        // Then you update that record using data from dialogData (values you enetered)
        this.userService.updateUtilisateur(result).subscribe(
          res => {
            console.log(res);
            if (res) {
              this.refresh();
              this.showNotification(
                'black',
                'Utilistaeur mis à jour avec succès...!!!',
                'bottom',
                'center'
              );
            }
          }
        );
        this.userService.getDialogData();
        // And lastly refresh table
      } else {
        console.log("pas d'edit");
      }
    });
  }

  deleteItem(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DeleteFormComponent, {
      data: row,
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.idUser === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.userService.deleteUtilisateur(row.idUser).subscribe(
          res => {
            if (res) {
              this.refresh();
              this.showNotification(
                'snackbar-warning',
                'Terrain effacer avec succes...!!!',
                'bottom',
                'center'
              );
            } else {
              this.showNotification(
                'snackbar-danger',
                'Terrain effacé avec succes...!!!',
                'bottom',
                'center'
              );
            }
          },
          error => {

          }
        );
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
        this.selection.select(row)
      );
  }

  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      console.log(item);
      this.userService.deleteUtilisateur(item.idUser).subscribe(
        res => {
          if (res) {

          } else {
            this.showNotification(
              'snackbar-danger',
              'Terrain :' + item.idUser + ' non effacé...!!!',
              'bottom',
              'center'
            );
          }
        },
        error => {

        }
      );
      this.exampleDatabase.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<User>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }

  public async changeDispo(user) {
    if (user.verified === true) {
      user.verified = false;
    } else if (user.verified === false) {
      user.verified = true;
    }
    this.userService.changeUtilisateurDispoById(user.idUser, user.verified).subscribe(
      res => {
        if (res) {

          // this.messageService.add({
          //     severity: 'SUCCESS',
          //     summary: 'Success',
          //     detail: 'Your Sponsor visibility status changed successfully.'
          // });
        } else {
          // this.sponsors[index].enable = !this.sponsors[index].enable;
          // this.messageService.add({
          //     severity: 'FAILED',
          //     summary: 'Error',
          //     detail: 'Your Sponsor status cannot be changed, please try again'
          // });
        }
      },
      error => {
        // this.sponsors[index].enable = !this.sponsors[index].enable;
        // this.messageService.add({
        //     severity: 'FAILED',
        //     summary: 'Error',
        //     detail: error.error
        // });
      }
    );
  }

  public loadData() {
    this.exampleDatabase = new UserService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
    console.log('data user = ', this.dataSource);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  // context menu
  onContextMenu(event: MouseEvent, item: User) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {item};
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<User> {
  // tslint:disable-next-line:variable-name
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: User[] = [];
  renderedData: User[] = [];

  constructor(
    // tslint:disable-next-line:variable-name
    public _exampleDatabase: UserService,
    // tslint:disable-next-line:variable-name
    public _paginator: MatPaginator,
    // tslint:disable-next-line:variable-name
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<User[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];
    this._exampleDatabase.getAllUtilisateurs();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._exampleDatabase.data
          .slice()
          .filter((user: User) => {
            const searchStr = (
              user.idUser +
              user.prenom +
              user.nom +
              user.username +
              user.email
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this._paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: User[]): User[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'idUser':
          [propertyA, propertyB] = [a.idUser, b.idUser];
          break;
        case 'prenom':
          [propertyA, propertyB] = [a.prenom, b.prenom];
          break;
        case 'nom':
          [propertyA, propertyB] = [a.nom, b.nom];
          break;
        case 'email':
          [propertyA, propertyB] = [a.email, b.email];
          break;
        case 'username':
          [propertyA, propertyB] = [a.username, b.username];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
