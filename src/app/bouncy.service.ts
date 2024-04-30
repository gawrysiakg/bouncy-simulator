import { Injectable } from '@angular/core';
import { MAIN_BOARD } from './consts';
import { Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BouncyService {
  constructor() {}

  public BOARD: any = MAIN_BOARD;
  private ballPosition!: Array<number>;
  //private ballPosition!: [number, number];
  private subscription: Subscription | undefined;
  private steps: number = 0;

  public getBoard() {
    return this.BOARD;
  }

  public setBallPosition(x: number, y: number) {
    this.ballPosition = [x, y];
  }

  // private move([x, y]: [number, number]): [number, number] {
  //   if (this.ballPosition) {

  //     let newPosition = [x + 1, y + 1];
  //     this.BOARD[this.ballPosition[0]][this.ballPosition[1]] =
  //       this.ballPosition = newPosition;

  //     return newPosition;

  //   }
  //   return [x, y];
  // }

  private move() {
    if (this.ballPosition) {
      let newPosition = [this.ballPosition[0] + 1, this.ballPosition[1] + 1];
      this.BOARD[newPosition[0]][newPosition[1]] = '1';
      this.BOARD[this.ballPosition[0]][this.ballPosition[1]] = '0';
      this.ballPosition = newPosition;
    }
  }

  public startGame() {
    if (!this.subscription) {
      this.subscription = interval(1000).subscribe(() => {
        this.move();
        console.log('Ball position: ' + this.ballPosition);
      });
    }
  }

  public stopGame() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
