import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { TodayComponent } from './today/today.component';
import { FutureComponent } from './future/future.component';

const routes: Routes = [
  {path: '', component:HomepageComponent},
  {path: 'today', component:TodayComponent},
  {path: 'future', component:FutureComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
``
