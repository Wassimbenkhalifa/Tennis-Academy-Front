import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexTitleSubtitle,
  ApexFill,
} from 'ng-apexcharts';
import {EChartOption} from 'echarts';
import {AuthService} from 'src/app/core/service/auth.service';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {Terrain} from 'src/app/terrain/all-terrain/terrain.model';
import {TerrainService} from 'src/app/terrain/all-terrain/terrain.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from 'src/app/user/all-user/user.model';
import {UserService} from 'src/app/user/all-user/user.service';
import {SeanceService} from "../../seance/all-seances/seance.service";
import {PlanificationService} from "../../planification/all-planifications/planification.service";

export type SparklineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; // ApexMarkers;
  stroke: any; // ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  colors: string[];
  labels: string[] | number[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

export type areaChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;

  // sparkline chart start
  public commonBarSparklineOptions: Partial<SparklineChartOptions> = {
    chart: {
      type: 'bar',
      width: 100,
      height: 25,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '40%',
      },
    },
    series: [
      {
        name: 'income',
        data: [31, 40, 28, 44, 60, 55, 68, 51, 42, 85, 77],
      },
    ],
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {},
      marker: {
        show: false,
      },
    },
  };

  // sparkline chart end
  // donut chart start
  donut_chart: EChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      show: false,
      data: ['Single', 'Double', 'King', 'Executive Suite', 'Apartments'],
      textStyle: {
        color: '#9aa0ac',
        padding: [5, 10],
      },
    },
    toolbox: {
      show: false,
    },
    series: [
      {
        name: 'Access to the resource',
        type: 'pie',
        radius: ['35%', '55%'],
        itemStyle: {
          normal: {
            label: {
              show: !0,
            },
            labelLine: {
              show: !0,
            },
          },
          emphasis: {
            label: {
              show: !0,
              position: 'center',
              textStyle: {
                fontSize: '14',
                fontWeight: 'normal',
              },
            },
          },
        },
        data: [
          {
            value: 734,
            name: 'Single',
          },
          {
            value: 567,
            name: 'Double',
          },
          {
            value: 464,
            name: 'King',
          },
          {
            value: 364,
            name: 'Executive Suite',
          },
          {
            value: 323,
            name: 'Apartments',
          },
        ],
      },
    ],
    color: ['#3CDBC2', '#FF2742', '#235A66', '#FFAB2F', '#86AEAC'],
  };
  // donut chart end
  // area chart start
  public areaChartOptions: Partial<areaChartOptions> = {
    series: [
      {
        name: 'Seance Libre',
        data: [31, 40, 28, 51, 42, 85, 44, 44, 77, 55, 76, 6],
      },
      {
        name: 'Seance Planifiee',
        data: [11, 32, 45, 32, 34, 52, 41, 40, 28, 51],
      },
    ],
    chart: {
      height: 380,
      type: 'area',
      toolbar: {
        show: false,
      },
      foreColor: '#9aa0ac',
    },
    colors: ['#9F8DF1', '#E79A3B'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      offsetX: 0,
      offsetY: 0,
    },

    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  };
  usernameProfile: string;
  admin = false;
  entraineur = false;
  joueur = false;
  nbrTerrain = 0;
  nbrPlanification = 0;
  nbrUtilisateurs = 0;
  nbrSeance = 0;
  AdminInfo: Object = new Object();
  rolesProfile: string[] = [];
  public authentifiee = false;
  IMG_BASE_URL = environment.IMG_BASE_URL;
  terrain$: Observable<Terrain[]>;
  activeTerrains: Terrain[];
  activeEntraineurs: User[];
  usersNumber: number = 0;
  terrainsNumber: number = 0;
  seancesNumber: number = 0;
  planificationsNumber: number = 0;

  // area chart end
  // tslint:disable-next-line:max-line-length
  constructor(private authService: AuthService, private router: Router,
              private seanceService: SeanceService, private terrainService: TerrainService, private utilisateurService: UserService,
              private planificationService: PlanificationService) {

  }

  ngOnInit(): void {
    if (this.authService.currentUserValue) {
      this.authentifiee = true;
      this.usernameProfile = this.authService.currentUserValue.username;
      this.rolesProfile = this.authService.currentUserValue.roles;
      this.rolesProfile.forEach(element => {
        if (element === "ROLE_ADMIN") {
          this.admin = true;
        } else if (element === "ROLE_COACH") {
          this.entraineur = true;
        } else {
          this.joueur = true;
        }
      });
    }
    setTimeout( () => {
    this.getAllTerrains();
    this.getAllUsers();
    this.getActiveEntraineurs();
    this.getAllSeances();
    this.getAllPlanifications();
    }, 2000 );
    // tslint:disable-next-line:no-unused-expression
    this.areaChartOptions.series[0].data;
  }

  // getInfos() {
  //   // this.authService.getAdminInfo().subscribe(
  //   //   data => {
  //   //     if (data){
  //   //       this.AdminInfo = data;
  //   //
  //   //     }
  //   //   }
  //   // );
  // }

  public getActiveEntraineurs(): void {
    this.utilisateurService.getAllActiveEntraineurs().subscribe(
      (data) => {
        this.activeEntraineurs = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  public getAllPlanifications(): void {
    this.planificationService.getAllPlans().subscribe(
      (data) => {
        this.planificationsNumber = data.length ? data.length : 0;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  public getAllUsers(): void {
    this.utilisateurService.getUsers().subscribe(
      (data) => {
        console.log(data);
        this.usersNumber = data.length ? data.length : 0;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  public getAllTerrains(): void {
    this.terrainService.getAllStadiums().subscribe(
      (data) => {
        console.log(data);
        this.terrainsNumber = data.length ? data.length : 0;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  public getAllSeances(): void {
    this.seanceService.getAllSessions().subscribe(
      (data) => {
        console.log(data);
        this.seancesNumber = data.length ? data.length : 0;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }


  reservez() {
    if (!this.authentifiee) {
      this.router.navigate(['/authentication/signin']);
    }
    // console.log("hello");
  }

}
