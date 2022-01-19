import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '../Task'
import { TASKS } from '../mock-tasks';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:4000/tasks';

  constructor(private http:HttpClient) { }

  // getTasks(): Task[] {
  //   return TASKS;
  // }

  // This above function is the same as saying the following, but with the interface
  // Task typescript enforced.

  // getTasks() {
  //   return TASKS;
  // }


  // To do this with an observable:

  // getTasks(): Observable<Task[]> {
  //   // return TASKS;  Error on this line becuase this line is not an observable. So the following creates one:
  //   const tasks = of(TASKS);
  //   return tasks;
  // }


  // To do this with an HTTP request

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }

}
