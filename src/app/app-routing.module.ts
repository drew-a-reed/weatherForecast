import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { TodayComponent } from './today/today.component';

const routes: Routes = [
  {path: '', component:HomepageComponent},
  {path: 'today', component:TodayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
``
