import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Topic } from './topic.model';
import { topicService } from './topic.service';
@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
})
export class TopicsComponent implements OnInit, OnDestroy {
  constructor(public tService: topicService) {}
  topics: Topic[];
  private topicSub: Subscription;
  panelOpenState = false;
  ngOnInit() {
    this.tService.fetchtopics();
    this.topicSub = this.tService
      .gettopicUpdateListener()
      .subscribe((TopicData: { topics: Topic[] }) => {
        this.topics = TopicData.topics;
      });
  }
  onSubmit(form: NgForm) {
    console.log(form.value.topicName);
    this.tService.addtopic(form.value.topicName);
  }
  ngOnDestroy() {
    this.topicSub.unsubscribe();
  }
}
