import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import {Task} from '../task.model';

@Component({
  selector: 'app-tasks-add',
  templateUrl: './tasks-add.component.html',
  styleUrls: ['./tasks-add.component.css']
})
export class TasksAddComponent implements OnInit {
  addTaskValue:String=null;
  constructor(private taskService:TaskService) { }

  ngOnInit() {
  }

  onTaskAdd(event){
    let task:Task = new Task(event.target.value,false,this.getTodayAsString());
    this.taskService.addTask(task).subscribe(
      (newTask:Task) =>{
        this.addTaskValue=' ';
        this.taskService.onTaskAdded.emit(newTask);
      }

    )
   
  }

  getTodayAsString()
  {
    let today = new Date();
    let dd: any=today.getDate();
    let mm: any=today.getMonth()+1;
    let yyyy:any=today.getFullYear();

    if(dd<10)
    {
      dd='0'+dd;
    }
    if(mm<10)
    {
      mm='0'+mm;
    }
    return mm+'/'+dd+'/'+yyyy;
  }

}
