import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../Task'
// import {TASKS} from '../../mock-tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  
  // ------------------------------------------------------------
  // tasks: Task[] = TASKS;
  //  THis ^ is the same as the following lines, BUT is implemented using a Typescript Interface wich defines our own
  //  type of type in Typescript, enforcing that each object in the tasks array is formatted with the correct data types.

    // tasks = [
    //   {
    //     id: 1,
    //     text: 'Doctors Appointment',
    //     day: 'May 5th at 2:30pm',
    //     reminder: true,
    //   },
    //   {
    //     id: 2,
    //     text: 'Meeting at School',
    //     day: 'May 6th at 1:30pm',
    //     reminder: true,
    //   },
    //   {
    //     id: 3,
    //     text: 'Food Shopping',
    //     day: 'May 7th at 12:30pm',
    //     reminder: false,
    //   },
    // ];
    // ------------------------------------------------------------

    tasks: Task[] = [];
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

    // Think of the .subscribe as a promise. A promise would have a .then method which would have it's 
    // values passed in (like the (tasks)) with an arrow function setting a value.

    // This method runs on Init (see parent method) and then sets the this (which is this TaskComponent Class)
    // to the tasks passed in from the subscribe function.  Then above where we are setting "tasks" on the class
    // we have the typescript enforcing type with the Task[].  So thae tasks variable is empty on this class until
    // this method gets data from it's (promose) - really Subscription. 
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  deleteTask(task: Task) {
    // Delete the task from the DB using HTTP reqeust
    this.taskService.deleteTask(task)
    .subscribe(() => (this.tasks = this.tasks.filter(t => t.id !== task.id)));
  }

  toggleReminder(task: Task) {
    // this.taskService.toggleReminder(task)
    // .subscribe(() => (SHOW LINE));
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task) {
    // this.taskService
    this.taskService.addTask(task).subscribe((tasks) =>this.tasks.push(task));
  }

}
