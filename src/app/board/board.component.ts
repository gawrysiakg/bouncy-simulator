import { Component } from '@angular/core';
import { MAIN_BOARD } from '../consts';
import { CommonModule } from '@angular/common';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, TileComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  public BOARD: any = MAIN_BOARD;

  handleTileClick(x: number, y: number) {
    console.log(x, y);
  }
}
