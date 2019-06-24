import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  tasks: Task[];
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'last_updated', 'actions'];

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
      console.log('Data requested...', this.tasks);
    });
  }

  editTask(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteTask(id) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.fetchTasks();
    });
  }

}
