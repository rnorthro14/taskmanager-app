import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private taskService: TaskService, private formBuilder: FormBuilder,
    private router: Router) {
      this.createForm = this.formBuilder.group({
        title: ['', Validators.required],
        responsible: '',
        description: '',
        severity: ''
      });
     }

  addTask(title, responsible, description, severity) {
    this.taskService.addTask(title, responsible, description, severity)
    .subscribe(()=>{
      this.router.navigate([`/list`]);
    });
  }   
  ngOnInit() {
  }

}
