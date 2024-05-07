import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
  private shakeEvent: any;
  private lastAcceleration: DeviceMotionEventAcceleration;
  @ViewChild('dynamicModal', { static: true }) dynamicModal: ElementRef;

  constructor() {

  }

  ngOnInit() {
    if ('ondevicemotion' in window) {
      // Browser supports the devicemotion event
      console.log('Device motion events supported');
    } else {
      // Browser does not support the devicemotion event
      console.log('Device motion events not supported');
    }

    this.shakeEvent = new Shake({ threshold: 15 });
    this.shakeEvent.start();
    window.addEventListener('shake', () => this.handleShakeEvent(), false);
  }
  handleShakeEvent() {
    // Handle the shake event here
    alert('Shake detected!');
  }

  // handleShakeEvent() {
  //   // Your logic for handling the shake event
  //   this.counter++;
  //   console.log('Shake detected!');
  // }
  // ngOnDestroy() {
  //   this.deviceMotion.clearWatchAcceleration();
  // }


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
