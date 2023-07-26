import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { FieldsetModule } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { ChipModule } from 'primeng/chip';
import { OrganizationChartModule } from 'primeng/organizationchart';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NavComponent } from '@components/nav/nav.component';
import { LoadingComponent } from '@components/loading/loading.component';
import { HomeComponent } from '@pages/home/home.component';
import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component';
import { LoginComponent } from '@pages/auth/login/login.component';
import { RegisterComponent } from '@pages/auth/register/register.component';
import { ProfileComponent } from '@pages/auth/profile/profile.component';
import { EventsComponent } from '@pages/events/events.component';
import { EventDetailComponent } from '@pages/events/event-detail/event-detail.component';
import { MyCalendarComponent } from '@pages/my-calendar/my-calendar.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { DashbCountriesComponent } from '@pages/dashboard/dashb-countries/dashb-countries.component';
import { DashbTeamsComponent } from '@pages/dashboard/dashb-teams/dashb-teams.component';
import { DashbGamesComponent } from '@pages/dashboard/dashb-games/dashb-games.component';
import { DashbCountriesDialogComponent } from '@pages/dashboard/dashb-countries/dashb-countries-dialog/dashb-countries-dialog.component';
import { NullHandlerPipe } from '@tools/pipes/null-handler.pipe';
import { DashbGamesDialogComponent } from '@pages/dashboard/dashb-games/dashb-games-dialog/dashb-games-dialog.component';
import { DashbEventsComponent } from '@pages/dashboard/dashb-events/dashb-events.component';
import { DashbPostsComponent } from '@pages/dashboard/dashb-posts/dashb-posts.component';
import { DashPostsAddComponent } from '@pages/dashboard/dashb-posts/dash-posts-add/dash-posts-add.component';
import { DashbEventsAddEditComponent } from '@pages/dashboard/dashb-events/dashb-events-add-edit/dashb-events-add-edit.component';
import { TruncatePipe } from '@tools/pipes/truncate.pipe';
import { TeamComponent } from '@pages/team/team.component';
import { TeamAddEditComponent } from '@pages/team/team-add-edit/team-add-edit.component';
import { TeamJoinComponent } from '@pages/team/team-join/team-join.component';
import { DashbStatusesComponent } from '@pages/dashboard/dashb-statuses/dashb-statuses.component';
import { DashbStatusesDialogComponent } from '@pages/dashboard/dashb-statuses/dashb-statuses-dialog/dashb-statuses-dialog.component';
import { DasbTeamsDialogComponent } from '@pages/dashboard/dashb-teams/dasb-teams-dialog/dasb-teams-dialog.component';
import { DashbPlayersComponent } from '@pages/dashboard/dashb-players/dashb-players.component';
import { DashbPlayersDialogComponent } from '@pages/dashboard/dashb-players/dashb-players-dialog/dashb-players-dialog.component';
import { DashbSettingsComponent } from '@pages/dashboard/dashb-settings/dashb-settings.component';
import { DashbSettingsDialogComponent } from '@pages/dashboard/dashb-settings/dashb-settings-dialog/dashb-settings-dialog.component';
import { DashbRoundsAddEditComponent } from '@pages/dashboard/dashb-events/dashb-rounds-add-edit/dashb-rounds-add-edit.component';
import { DashbAnnouncementsComponent } from '@pages/dashboard/dashb-announcements/dashb-announcements.component';
import { DashbAnnouncementsAddEditComponent } from '@pages/dashboard/dashb-announcements/dashb-announcements-add-edit/dashb-announcements-add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EventsComponent,
    EventDetailComponent,
    MyCalendarComponent,
    DashboardComponent,
    DashbCountriesComponent,
    DashbTeamsComponent,
    DashbGamesComponent,
    NullHandlerPipe,
    DashbCountriesDialogComponent,
    DashbGamesDialogComponent,
    DashbEventsComponent,
    DashbPostsComponent,
    DashPostsAddComponent,
    TruncatePipe,
    DashbEventsAddEditComponent,
    TeamComponent,
    TeamAddEditComponent,
    TeamJoinComponent,
    LoadingComponent,
    DashbStatusesComponent,
    DashbStatusesDialogComponent,
    DasbTeamsDialogComponent,
    DashbPlayersComponent,
    DashbPlayersDialogComponent,
    DashbSettingsComponent,
    DashbSettingsDialogComponent,
    DashbRoundsAddEditComponent,
    DashbAnnouncementsComponent,
    DashbAnnouncementsAddEditComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MenuModule,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    ToastModule,
    MessagesModule,
    PanelModule,
    CalendarModule,
    TableModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    DialogModule,
    EditorModule,
    DynamicDialogModule,
    FileUploadModule,
    AccordionModule,
    DividerModule,
    CheckboxModule,
    InputSwitchModule,
    InputNumberModule,
    FieldsetModule,
    DropdownModule,
    FullCalendarModule,
    ProgressSpinnerModule,
    TabViewModule,
    ChipModule,
    OrganizationChartModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    MessageService,
    ConfirmationService,
    DialogService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
