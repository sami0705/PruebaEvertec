import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './vistas/edit/edit.component';
import { UserComponent } from './vistas/user/user.component';
import { NewComponent } from './vistas/new/new.component';


const routes: Routes = [
  { path: '', redirectTo:'user', pathMatch:'full'},
  { path: 'user', component:UserComponent},
  { path: 'edit', component:EditComponent},
  { path: 'new', component:NewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
