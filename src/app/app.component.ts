import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'firsbase-demo';
  courseob$: AngularFireList<any[]>;
  courses$;

  constructor(private db: AngularFireDatabase) {
    this.courseob$ = db.list('/courses');
    this.courses$ = db.list('/courses').valueChanges();
  }
  add(course: any) {
    this.courseob$.push(course.value);
    course.value = "";
  }

  delete(course, id) {
    this.db.object('/courses/'+ id)
      .remove();
  }

  update(course, id) {
    this.db.object('/courses/'+ id)
      .update({
        isLive: true
      });
  }

}
