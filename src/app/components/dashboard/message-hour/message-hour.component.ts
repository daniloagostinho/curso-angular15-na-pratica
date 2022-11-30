import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message-hour',
  templateUrl: './message-hour.component.html',
  styleUrls: ['./message-hour.component.scss']
})
export class MessageHourComponent implements OnInit {
  @Output() messageHour = new EventEmitter();

  ngOnInit() {
    this.message();
  }

  message() {
    let hour = new Date().getHours();
    if(hour <= 5) {
      this.messageHour.emit('Boa madrugada!')
      return;
    }
    if(hour < 12) {
      this.messageHour.emit('Bom dia!')
      return;
    }
    if(hour < 18) {
      this.messageHour.emit('Boa tarde!')
      return;
    }
    this.messageHour.emit('Boa noite')
  }
}
