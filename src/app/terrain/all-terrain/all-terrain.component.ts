import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {HttpClient} from '@angular/common/http';
import {error} from '@angular/compiler/src/util';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {BehaviorSubject, merge, fromEvent, map, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {DeleteComponent} from './dialogs/delete/delete.component';
import {FormDialogComponent} from './dialogs/form-dialog/form-dialog.component';
import {Terrain} from './terrain.model';
import {TerrainService} from './terrain.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-terrain',
  templateUrl: './all-terrain.component.html',
  styleUrls: ['./all-terrain.component.sass']
})
export class AllTerrainComponent implements OnInit {
  IMG_BASE_URL = environment.IMG_BASE_URL;

  displayedColumns = [
    'select',
    'idTerrain',
    'photo',
    'label',
    'type',
    'enable',
    'actions',
  ];
  exampleDatabase: TerrainService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Terrain>(true, []);
  id: number;
  terrain: Terrain | null;

  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public dialog: MatDialog,
    public terrainService: TerrainService,
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
    this.router.navigate(['/terrain/add-terrain']);
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
        terrain: row,
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
        this.terrainService.updateTerrain(result).subscribe(
          res => {
            console.log(res);
            if (res) {
              this.refresh();
              this.showNotification(
                'black',
                'Terrain editer avec succes...!!!',
                'bottom',
                'center'
              );
            }
          }
        );
        this.terrainService.getDialogData();
        // And lastly refresh table
      } else {
        console.log("pas dedit");
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
          (x) => x.idTerrain === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.terrainService.deleteTerrain(row.idTerrain).subscribe(
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
                'Terrain effacer avec succes...!!!',
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
      this.terrainService.deleteTerrain(item.idTerrain).subscribe(
        res => {
          if (res) {

          } else {
            this.showNotification(
              'snackbar-danger',
              'Terrain :' + item.idTerrain + ' non effacer...!!!',
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
      this.selection = new SelectionModel<Terrain>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }

  public async changeDispo(terrain) {
    if (terrain.enable == true) {
      terrain.enable = false;
    } else if (terrain.enable == false) {
      terrain.enable = true;
    }
    this.terrainService.changeTerrainDispoById(terrain.idTerrain, terrain.enable).subscribe(
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
    this.exampleDatabase = new TerrainService(this.httpClient);
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
  onContextMenu(event: MouseEvent, item: Terrain) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {item: item};
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<Terrain> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Terrain[] = [];
  renderedData: Terrain[] = [];

  constructor(
    public _exampleDatabase: TerrainService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Terrain[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];
    this._exampleDatabase.getAllTerrains();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._exampleDatabase.data
          .slice()
          .filter((terrain: Terrain) => {
            const searchStr = (
              terrain.idTerrain +
              terrain.label +
              terrain.type +
              terrain.enable
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
  sortData(data: Terrain[]): Terrain[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'idTerrain':
          [propertyA, propertyB] = [a.idTerrain, b.idTerrain];
          break;
        case 'label':
          [propertyA, propertyB] = [a.label, b.label];
          break;
        case 'type':
          [propertyA, propertyB] = [a.type, b.type];
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
