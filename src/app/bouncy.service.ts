import { Injectable } from '@angular/core';
import { MAIN_BOARD } from './consts';
import { Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BouncyService {
  constructor() {}

  public BOARD: any = MAIN_BOARD;
  private ballPosition: [number, number] | undefined;
  private subscription: Subscription | undefined;
  private directionX: number = 1; // Kierunek ruchu wzdłuż osi X
  private directionY: number = 1; // Kierunek ruchu wzdłuż osi Y

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

      // Oblicz kolejną pozycję piłki
      const nextX = x + this.directionX;
      const nextY = y + this.directionY;

      // Sprawdź, czy następna pozycja mieści się w granicach planszy
      if (
        nextX >= 0 &&
        nextX < this.BOARD.length &&
        nextY >= 0 &&
        nextY < this.BOARD[0].length
      ) {
        // Sprawdź, czy następne pole nie jest polem 'X' lub 'Y'
        if (this.BOARD[nextX][nextY] !== 'X') {
          if (this.BOARD[nextX][nextY] === 'Y') {
            // Odbicie od pola 'Y', zmień pole na '0'
            this.BOARD[nextX][nextY] = '0';
            // Odbicie piłki od ściany
            this.directionX *= -1;
            this.directionY *= -1;
          } else {
            // Aktualizuj pozycję piłki na planszy
            this.BOARD[x][y] = '0'; // Wyczyść bieżącą pozycję
            this.BOARD[nextX][nextY] = '1'; // Ustaw piłkę na nowej pozycji
            this.ballPosition = [nextX, nextY]; // Zaktualizuj pozycję piłki
          }
        } else {
          // Odbicie piłki od ściany
          this.directionX *= -1;
          this.directionY *= -1;
        }

        // Losowo zmień kierunek po odbiciu
        if (Math.random() < 0.3) {
          // Losowo wybierz, czy zmieniać kierunek w osi X czy Y
          const changeX = Math.random() < 0.5;
          if (changeX) {
            // Zmień kierunek w osi X
            this.directionX *= -1;
          } else {
            // Zmień kierunek w osi Y
            this.directionY *= -1;
          }
        }
      } else {
        // Odbicie piłki od ściany
        this.directionX *= -1;
        this.directionY *= -1;
      }
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
