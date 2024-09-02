import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  data: any;
  displayedColumns: string[] = ['key', 'value'];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.data = navigation?.extras?.state?.['data'];
  }

  ngOnInit(): void {
    console.log(this.data);
  }
}
