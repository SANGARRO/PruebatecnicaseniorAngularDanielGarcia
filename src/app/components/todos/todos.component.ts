import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TodosService } from './../../services/todos.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [TodosService]
})
export class TodosComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns: string[] = ['id', 'title', 'actions'];
  newTodo = { title: '', completed: false };
  filterTitle = '';
  filterCompleted: string = '';

  get filteredDataSource() {
    return this.dataSource.filter(todo => {
      const matchesTitle = todo.title.toLowerCase().includes(this.filterTitle.toLowerCase());
      const matchesCompletion = this.filterCompleted === '' || todo.completed.toString() === this.filterCompleted;
      return matchesTitle && matchesCompletion;
    });
  }

  constructor(
    private router: Router,
    private service: TodosService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.service.getItems('todos').subscribe((data) => {
      this.dataSource = data;
    });
  }

  addTodo(): void {
    const newItem = { ...this.newTodo, id: this.dataSource.length + 1 }; // ID management should be handled properly in real scenarios
    this.dataSource.push(newItem);
    this.newTodo = { title: '', completed: false }; // Reset form
  }

  redirect(data: any): void {
    this.router.navigate(['/details'], { state: { data } });
  }

  openEditDialog(element: any): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.findIndex(
          (item: any) => item.id === result.id
        );
        if (index !== -1) {
          this.dataSource[index] = result;
        }
      }
    });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource = this.dataSource.filter((item: any) => item.id !== id);
      }
    });
  }

  toggleComplete(element: any): void {
    element.completed = !element.completed;
  }
}
