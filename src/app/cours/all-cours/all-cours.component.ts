import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CoursService} from './cours.service';
import {Cours} from './cours.model';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatDialog} from '@angular/material/dialog';
import {FormDialogComponent} from './dialogs/form-dialog/form-dialog.component';
import {DeleteComponent} from './dialogs/delete/delete.component';
import {BehaviorSubject, fromEvent, merge, map, Observable} from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-cours',
  templateUrl: './all-cours.component.html',
  styleUrls: ['./all-cours.component.sass']
})
export class AllCoursComponent {
  displayedColumns = [
    'select',
    'idCours',
    'label',
    'description',
    'duree',
    'nbrPlaces',
    'actions',
  ];
  exampleDatabase: CoursService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Cours>(true, []);
  id: number;
  cours: Cours | null;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public coursService: CoursService,
    private snackBar: MatSnackBar,
    public router: Router
  ) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    this.router.navigate(['/cours/add-cours']);
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
        cours: row,
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
        this.coursService.updateCours(result).subscribe(
          res => {
            console.log(res);
            if (res) {
              this.refresh();
              this.showNotification(
                'black',
                'Cours mis à jour avec succes...!!!',
                'bottom',
                'center'
              );
            }
          }
        );
        this.coursService.getDialogData();
        // And lastly refresh table
      } else {
        console.log("pas de mise à jour");
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
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: row,
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.idCours === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.coursService.deleteCours(row.idCours).subscribe(
          res => {
            if (res) {
              this.refresh();
              this.showNotification(
                'snackbar-success',
                'Cours effacé avec succés...!!!',
                'bottom',
                'center'
              );
            } else {
              this.showNotification(
                'snackbar-danger',
                'Cours effacé avec succés...!!!',
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
      this.coursService.deleteCours(item.idCours).subscribe(
        res => {
          if (res) {

          } else {
            this.showNotification(
              'snackbar-danger',
              'Cours :' + item.idCours + ' non effacer...!!!',
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
      this.selection = new SelectionModel<Cours>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }

  //  public async changeDispo(terrain){
  //     if(terrain.enable==true)
  //       terrain.enable=false;
  //     else if(terrain.enable==false)
  //       terrain.enable=true;
  //       this.coursService.changeCoursDispoById(terrain.idTerrain,terrain.enable).subscribe(
  //         res => {
  //             if (res) {

  //                 // this.messageService.add({
  //                 //     severity: 'SUCCESS',
  //                 //     summary: 'Success',
  //                 //     detail: 'Your Sponsor visibility status changed successfully.'
  //                 // });
  //             } else {
  //                 // this.sponsors[index].enable = !this.sponsors[index].enable;
  //                 // this.messageService.add({
  //                 //     severity: 'FAILED',
  //                 //     summary: 'Error',
  //                 //     detail: 'Your Sponsor status cannot be changed, please try again'
  //                 // });
  //             }
  //         },
  //         error => {
  //             // this.sponsors[index].enable = !this.sponsors[index].enable;
  //             // this.messageService.add({
  //             //     severity: 'FAILED',
  //             //     summary: 'Error',
  //             //     detail: error.error
  //             // });
  //         }
  //     );
  //   }

  public loadData() {
    this.exampleDatabase = new CoursService(this.httpClient);
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
  onContextMenu(event: MouseEvent, item: Cours) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {item: item};
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<Cours> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Cours[] = [];
  renderedData: Cours[] = [];

  constructor(
    public _exampleDatabase: CoursService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Cours[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];
    this._exampleDatabase.getAllCours();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._exampleDatabase.data
          .slice()
          .filter((cours: Cours) => {
            const searchStr = (
              cours.idCours +
              cours.label +
              cours.description +
              cours.duree +
              cours.nbrPlaces
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
  sortData(data: Cours[]): Cours[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'idCours':
          [propertyA, propertyB] = [a.idCours, b.idCours];
          break;
        case 'label':
          [propertyA, propertyB] = [a.label, b.label];
          break;
        case 'description':
          [propertyA, propertyB] = [a.description, b.description];
          break;
        case 'duree':
          [propertyA, propertyB] = [a.duree, b.duree];
          break;
        case 'nbrPlaces':
          [propertyA, propertyB] = [a.nbrPlaces, b.nbrPlaces];
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
