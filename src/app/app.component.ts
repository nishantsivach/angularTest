import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NgxCaptureService } from 'ngx-capture';
import { tap } from 'rxjs';
import Shake from 'shake.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  toggleModal: boolean = false
  toggleState: boolean = true
  counter: number = 1;
  img = '';
  body = document.body;
  private shakeEvent: any;
  private lastAcceleration: DeviceMotionEventAcceleration;
  @ViewChild('dynamicModal', { static: true }) dynamicModal: ElementRef;

  constructor(private captureService: NgxCaptureService) {

  }

  ngOnInit() {


    this.shakeEvent = new Shake({ threshold: 15 });
    this.shakeEvent.start();
    window.addEventListener('shake', () => this.handleShakeEvent(), false);
  }
  handleShakeEvent() {
    alert('Shake detected!');
    this.fullCapture()

  }
  fullCapture() {
    this.captureService
      .getImage(this.body, true)
      .pipe(
        tap((img: string) => {
          this.img = img;
          console.log(img);
        })
      )
      .subscribe();
  }

  public handleModal() {
    this.toggleModal = !this.toggleModal
    console.log("check button is click", this.toggleModal)
  }

  public onToggleChange(event: any) {
    this.toggleState = event
    console.log("check")
  }

  ngOnDestroy() {
    this.shakeEvent.stop();
    window.removeEventListener('shake', this.handleShakeEvent.bind(this), false);
  }


}
