import { Component } from '@angular/core';
import { MAIN_BOARD, Operation } from '../consts';
import { CommonModule, NgIf } from '@angular/common';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, TileComponent, NgIf],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  public BOARD: any = MAIN_BOARD;

  isBallVisible = false;
  areObstaclesVisible = false;
  public currentOperation: Operation = Operation.SET_BALL;
  public buttonText = '';

  handleTileClick(x: number, y: number) {
    if (this.currentOperation === Operation.SET_BALL) {
      this.BOARD[x][y] = '1';
      this.isBallVisible = true;
      this.currentOperation = Operation.SET_OBSTACLE;
    } else if (this.currentOperation === Operation.SET_OBSTACLE) {
      if (this.BOARD[x][y] === '0') {
        this.BOARD[x][y] = 'Y';
      } else if (this.BOARD[x][y] === 'Y') {
        this.BOARD[x][y] = '0';
      }
      // this.currentOperation = Operation.PLAY;
    } else if (this.currentOperation === Operation.RESTART) {
      this.BOARD = MAIN_BOARD;
    }
  }

  handleObstacleOKButton() {
    if (this.isBallVisible) {
      this.currentOperation = Operation.PLAY;
    } else {
      alert('Set ball position');
    }
  }
}
