import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('video')
  public video!: ElementRef;

  @ViewChild('canvas')
  public canvas!: ElementRef;

  public captures: Array<any>;

  public constructor() {
    this.captures = [];
  }

  public ngOnInit() {}

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    var context = this.canvas.nativeElement
      .getContext('2d')
      .drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL('image/png'));
  }
}