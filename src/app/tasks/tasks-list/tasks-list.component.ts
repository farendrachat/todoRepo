import { Component, OnInit } from '@angular/core';
import {Task} from '../task.model';
import {TaskService} from '../task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
	
	tasks: Task[] = [];

  constructor(private taskService:TaskService) { }

  ngOnInit() {
 this.taskService.getTasks().
subscribe(
    (tasks:any[])=>{
    this.tasks = tasks
    },
    (error)=>console.log("error in task list"+error)
    
    );
    
    this.taskService.onTaskAdded.subscribe(
      (task:Task)=>this.tasks.push(task)
    );
// this.tasks.push(new Task("Task1",true,"07/01/2018"));
// this.tasks.push(new Task("Task2",true,"08/01/2018"));
// this.tasks.push(new Task("Task3",false,"09/01/2018"));
// this.tasks.push(new Task("Task4",true,"06/01/2018"));
  }
  
    
    getDueDateLabel(task:Task){
        return task.completed ? 'label-success' : 'label-primary';
        }
    onTaskChange(event,task){
        this.taskService.saveTask(task,event.target.checked).subscribe();
        }

}
