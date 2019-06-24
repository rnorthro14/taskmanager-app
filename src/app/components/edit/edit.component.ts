import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  task: any = {};
  updateForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private taskService: TaskService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private snackBar: MatSnackBar,
     private fb: FormBuilder) {
    this.createUpdateFormGroup();
  }

  createUpdateFormGroup() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: '',
      status: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.taskService.getTaskById(this.id).subscribe(res => {
        this.task = res;
        this.updateForm.get('title').setValue(this.task.title);
        this.updateForm.get('responsible').setValue(this.task.responsible);
        this.updateForm.get('description').setValue(this.task.description);
        this.updateForm.get('severity').setValue(this.task.severity);
        this.updateForm.get('status').setValue(this.task.status);
      });
    });
  }

  updateTask(title, responsible, description, severity, status) {
    this.taskService.updateTask(this.id, title, responsible, description, severity, status).subscribe(() => {
      this.snackBar.open('Task updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

}
