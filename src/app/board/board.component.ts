import { Component } from '@angular/core';
import { MAIN_BOARD } from '../consts';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  public BOARD: any = MAIN_BOARD;
}
