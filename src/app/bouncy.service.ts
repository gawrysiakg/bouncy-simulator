import { Injectable } from '@angular/core';
import { MAIN_BOARD } from './consts';

@Injectable({
  providedIn: 'root',
})
export class BouncyService {
  constructor() {}

  public BOARD: any = MAIN_BOARD;
  private ballPosition: [number, number] | undefined;
  private directionX: number = 1;
  private directionY: number = 1;
  public intervalId: any = undefined;
  public ballSpeed = 500;

  public getBoard() {
    return this.BOARD;
  }

  public setBallPosition(x: number, y: number) {
    this.ballPosition = [x, y];
    this.BOARD[x][y] = '1';
  }

  public setObstacle(x: number, y: number) {
    this.BOARD[x][y] = 'Y';
  }

  private move() {
    if (this.ballPosition) {
      const [x, y] = this.ballPosition;
      const nextX = x + this.directionX;
      const nextY = y + this.directionY;

      if (this.isNextPositionValid(nextX, nextY)) {
        this.updateBallPosition(x, y, nextX, nextY);
      } else {
        this.calculateNewBallDirection();
        const [newX, newY] = [x + this.directionX, y + this.directionY];
        if (this.isNextPositionValid(newX, newY)) {
          this.updateBallPosition(x, y, newX, newY);
        }
      }
    }
  }

  private isNextPositionValid(x: number, y: number): boolean {
    return (
      x >= 0 &&
      x < this.BOARD.length &&
      y >= 0 &&
      y < this.BOARD[0].length &&
      this.BOARD[x][y] !== 'X'
    );
  }

  private updateBallPosition(
    x: number,
    y: number,
    nextX: number,
    nextY: number
  ) {
    if (this.BOARD[nextX][nextY] === 'Y') {
      this.directionX = -this.directionX;
      this.directionY = -this.directionY;
      this.BOARD[nextX][nextY] = '0';
    } else {
      this.BOARD[nextX][nextY] = '1';
      this.BOARD[x][y] = '0';
      this.ballPosition = [nextX, nextY];
    }
  }

  private calculateNewBallDirection(): void {
    const [x, y] = this.ballPosition! || [];
    const possibleDirections = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
      { dx: 1, dy: 1 },
      { dx: 1, dy: -1 },
      { dx: -1, dy: 1 },
      { dx: -1, dy: -1 },
    ].filter(({ dx, dy }) => {
      const nx = x + dx;
      const ny = y + dy;
      return (
        nx >= 0 &&
        nx < this.BOARD.length &&
        ny >= 0 &&
        ny < this.BOARD[0].length &&
        this.BOARD[nx][ny] !== 'X'
      );
    });

    if (possibleDirections.length > 0) {
      const { dx, dy } =
        possibleDirections[
          Math.floor(Math.random() * possibleDirections.length)
        ];
      this.directionX = dx;
      this.directionY = dy;
    }
  }

  public startGame() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.move();
      }, this.ballSpeed);
    }
  }

  public setBallSpeed(speed: number) {
    this.ballSpeed = speed;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        this.move();
      }, this.ballSpeed);
    }
  }
  public stopGame() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
      this.BOARD = MAIN_BOARD;
      if (this.ballPosition) {
        const [x, y] = this.ballPosition;
        this.BOARD[x][y] = '0';
      }
    }
  }
}
