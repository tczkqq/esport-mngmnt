import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { NgModule } from '@angular/core';

import { Roles } from '@constants/roles.constants';
import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component';
import { RegisterComponent } from '@pages/auth/register/register.component';
import { LoginComponent } from '@pages/auth/login/login.component';
import { HomeComponent } from '@pages/home/home.component';
import { ProfileComponent } from '@pages/auth/profile/profile.component';
import { EventsComponent } from '@pages/events/events.component';
import { MyCalendarComponent } from '@pages/my-calendar/my-calendar.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { DashbGamesComponent } from '@pages/dashboard/dashb-games/dashb-games.component';
import { DashbCountriesComponent } from '@pages/dashboard/dashb-countries/dashb-countries.component';
import { DashbTeamsComponent } from '@pages/dashboard/dashb-teams/dashb-teams.component';
import { DashbEventsComponent } from '@pages/dashboard/dashb-events/dashb-events.component';
import { DashbPostsComponent } from '@pages/dashboard/dashb-posts/dashb-posts.component';
import { DashPostsAddComponent } from '@pages/dashboard/dashb-posts/dash-posts-add/dash-posts-add.component';
import { DashbEventsAddEditComponent } from '@pages/dashboard/dashb-events/dashb-events-add-edit/dashb-events-add-edit.component';
import { EventDetailComponent } from '@pages/events/event-detail/event-detail.component';
import { TeamComponent } from '@pages/team/team.component';
import { DashbStatusesComponent } from '@pages/dashboard/dashb-statuses/dashb-statuses.component';
import { DashbPlayersComponent } from '@pages/dashboard/dashb-players/dashb-players.component';
import { DashbSettingsComponent } from '@pages/dashboard/dashb-settings/dashb-settings.component';
import { DashbAnnouncementsComponent } from '@pages/dashboard/dashb-announcements/dashb-announcements.component';
import { DashbAnnouncementsAddEditComponent } from '@pages/dashboard/dashb-announcements/dashb-announcements-add-edit/dashb-announcements-add-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.Visitor] },
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.Visitor] },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.Visitor] },
  },
  {
    path: 'profile/:userId',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.Visitor] },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.User] },
  },
  {
    path: 'myCalendar',
    component: MyCalendarComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.User] },
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.Visitor] },
  },
  {
    path: 'team',
    component: TeamComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.Visitor] },
  },
  {
    path: 'events/:eventId',
    component: EventDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.Visitor] },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.Staff] },
    children: [
      {
        path: 'games',
        component: DashbGamesComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.Staff] },
      },
      {
        path: 'countries',
        component: DashbCountriesComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.Staff] },
      },
      {
        path: 'teams',
        component: DashbTeamsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.Staff] },
      },
      {
        path: 'players',
        component: DashbPlayersComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.Staff] },
      },
      {
        path: 'events',
        component: DashbEventsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.Staff] },
      },
      {
        path: 'events/add',
        component: DashbEventsAddEditComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.Staff] },
      },
      {
        path: 'events/:eventId',
        component: DashbEventsAddEditComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.Staff] },
      },
      {
        path: 'settings',
        component: DashbSettingsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.Admin] },
      },
      {
        path: 'statuses',
        component: DashbStatusesComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.Staff] },
      },
      {
        path: 'posts',
        component: DashbPostsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.Staff] },
      },
      {
        path: 'posts/add',
        component: DashPostsAddComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.Staff] },
      },
      {
        path: 'posts/:postId',
        component: DashPostsAddComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.Staff] },
      },
      {
        path: 'announcements',
        component: DashbAnnouncementsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.Staff] },
      },
      {
        path: 'announcements/add',
        component: DashbAnnouncementsAddEditComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.Staff] },
      },
      {
        path: 'announcements/:annId',
        component: DashbAnnouncementsAddEditComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.Staff] },
      },
    ],
  },
  {
    path: 'pageNotFound',
    component: PageNotFoundComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.Visitor] },
  },
  {
    path: '**',
    redirectTo: '/pageNotFound',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
