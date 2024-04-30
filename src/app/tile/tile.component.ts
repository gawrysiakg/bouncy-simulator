import { Component, Input } from '@angular/core';
import { TileName } from '../consts';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss',
})
export class TileComponent {
  @Input() tileType!: TileName;
}
