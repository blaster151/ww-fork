import { Injectable } from '@angular/core';

@Injectable()
export class AudioPlayerService {

  constructor() { }

  playSound(url: string) {
    const audio = new Audio();
    audio.src = 'http://remote.address.com/example.mp3';
    audio.load();
    audio.play();
  }
}
