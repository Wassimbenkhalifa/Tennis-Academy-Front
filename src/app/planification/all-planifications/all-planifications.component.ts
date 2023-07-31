import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {HttpClient} from '@angular/common/http';
import {Planification} from './planification.model';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {BehaviorSubject, merge, fromEvent, map, Observable} from 'rxjs';
import {PlanificationService} from './planification.service';
import {FormDialogComponent} from './dialog/form-dialog/form-dialog.component';
import {DeleteFormComponent} from './dialog/delete-form/delete-form.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-planifications',
  templateUrl: './all-planifications.component.html',
  styleUrls: ['./all-planifications.component.sass']
})
export class AllPlanificationsComponent {

  displayedColumns = [
    'select',
    'idPlanification',
    'dateDebut',
    'dateFin',
    'cours',
    'actions',
  ];
  exampleDatabase: PlanificationService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Planification>(true, []);
  id: number;
  planification: Planification | null;

  constructor(
    public httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    public planificationService: PlanificationService,
    private snackBar: MatSnackBar
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
    this.router.navigate(['/planification/add-planification']);
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
        planification: row,
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
        this.planificationService.updatePlanification(result).subscribe(
          res => {
            console.log(res);
            if (res) {
              this.refresh();
              this.showNotification(
                'black',
                'planification mise à jour avec succès...!!!',
                'bottom',
                'center'
              );
            }
          }
        );
        this.planificationService.getDialogData();
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
    const dialogRef = this.dialog.open(DeleteFormComponent, {
      data: row,
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.idPlanification === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.planificationService.deletePlanification(row.idPlanification).subscribe(
          res => {
            if (res) {
              this.refresh();
              this.showNotification(
                'snackbar-warning',
                'planification effacée avec succes...!!!',
                'bottom',
                'center'
              );
            } else {
              this.showNotification(
                'snackbar-danger',
                'planification effacée avec succes...!!!',
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
      this.planificationService.deletePlanification(item.idPlanification).subscribe(
        res => {
          if (res) {

          } else {
            this.showNotification(
              'snackbar-danger',
              'Planification :' + item.idPlanification + ' non effacée...!!!',
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
      this.selection = new SelectionModel<Planification>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }


  public loadData() {
    this.exampleDatabase = new PlanificationService(this.httpClient);
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
  onContextMenu(event: MouseEvent, item: Planification) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {item: item};
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<Planification> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Planification[] = [];
  renderedData: Planification[] = [];

  constructor(
    public _exampleDatabase: PlanificationService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Planification[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];
    this._exampleDatabase.getAllPlanifications();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._exampleDatabase.data
          .slice()
          .filter((planification: Planification) => {
            const searchStr = (
              planification.idPlanification +
              planification.dateDebut +
              planification.dateFin
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
  sortData(data: Planification[]): Planification[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'idPlanification':
          [propertyA, propertyB] = [a.idPlanification, b.idPlanification];
          break;
        case 'dateDebut':
          [propertyA, propertyB] = [a.dateDebut, b.dateDebut];
          break;
        case 'dateFin':
          [propertyA, propertyB] = [a.dateFin, b.dateFin];
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
