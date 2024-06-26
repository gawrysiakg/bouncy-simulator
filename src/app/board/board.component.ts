import { Component } from '@angular/core';
import { Operation } from '../consts';
import { CommonModule, NgIf } from '@angular/common';
import { TileComponent } from '../tile/tile.component';
import { BouncyService } from '../bouncy.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, TileComponent, NgIf],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  public BOARD: any;
  constructor(private _bouncyService: BouncyService) {
    this.BOARD = _bouncyService.getBoard();
  }

  isBallVisible = false;
  areObstaclesVisible = false;
  public currentOperation: Operation = Operation.SET_BALL;
  public buttonText = '';
  public isGameStarted = false;

  handleTileClick(x: number, y: number) {
    if (this.currentOperation === Operation.SET_BALL) {
      if (this.BOARD[x][y] === '0') {
        this._bouncyService.setBallPosition(x, y);
        this.isBallVisible = true;
        this.currentOperation = Operation.SET_OBSTACLE;
      }
    } else if (this.currentOperation === Operation.SET_OBSTACLE) {
      if (this.BOARD[x][y] === '0') {
        this.BOARD[x][y] = 'Y';
      } else if (this.BOARD[x][y] === 'Y') {
        this.BOARD[x][y] = '0';
      }
    } else if (this.currentOperation === Operation.RESTART) {
      this.BOARD = this._bouncyService.getBoard();
    }
  }

  handleObstacleOKButton() {
    if (this.isBallVisible) {
      this.currentOperation = Operation.PLAY;
      this.isGameStarted = true;
      this._bouncyService.startGame();
    } else {
      alert('Set ball position');
    }
  }

  handleStopButton() {
    this.isGameStarted = false;
    this._bouncyService.stopGame();
    this.areObstaclesVisible = false;
    this.currentOperation = Operation.SET_BALL;
    this.BOARD = this._bouncyService.getBoard();
  }
}
