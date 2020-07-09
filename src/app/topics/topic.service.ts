import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { Topic } from './topic.model';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class topicService {
  private topics: Topic[] = [];
  private topicsupdated = new Subject<{ topics: Topic[] }>();
  constructor(private http: HttpClient) {}
  addtopic(topicName: string) {
    const body = {
      topicName: topicName,
    };
    this.http.post('http://localhost:3000/api/topics/', body).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  fetchtopics() {
    this.http
      .get<{ message: string; topics: any }>(
        'http://localhost:3000/api/topics/'
      )
      .pipe(
        map((topicData) => {
          console.log(topicData);
          return {
            topics: topicData.topics.map((topic) => {
              return {
                name: topic.topicname,
              };
            }),
          };
        })
      )
      .subscribe((data) => {
        this.topics = data.topics;
        this.topicsupdated.next({ topics: [...this.topics] });
      });
  }
  gettopicUpdateListener() {
    return this.topicsupdated.asObservable();
  }
}
