import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { BouncyService } from './bouncy.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'bouncy simulator';

  constructor(private _bouncyService: BouncyService) {}

  handleBallSpeed(speed: number) {
    this._bouncyService.setBallSpeed(speed);
    console.log(speed);
  }
}
