import {NgModule} from '@angular/core';
import {Page404Component} from './authentication/page404/page404.component';
import {AuthLayoutComponent} from './layout/app-layout/auth-layout/auth-layout.component';
import {MainLayoutComponent} from './layout/app-layout/main-layout/main-layout.component';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './core/guard/auth.guard';

const routes: Routes = [

  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'dashboard',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'utilisateurs',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'terrain',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./terrain/terrain.module').then((m) => m.TerrainModule),
      },
      {
        path: 'cours',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./cours/cours.module').then((m) => m.CoursModule),
      },
      {
        path: 'planification',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./planification/planification.module').then((m) => m.PlanificationModule),
      },
      {
        path: 'seance',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./seance/seance.module').then((m) => m.SeanceModule),
      },

      {
        path: 'media',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./media/media.module').then((m) => m.MediaModule),
      },

    ],
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
