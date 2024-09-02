import { Routes } from '@angular/router';
import { TodosComponent } from './components/todos/todos.component';
import { DetailsComponent } from './components/details/details.component';

export const routes: Routes = [
  { path: 'todos', component: TodosComponent },
  { path: 'details', component: DetailsComponent },
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
];
