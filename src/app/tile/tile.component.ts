import { Component, Input } from '@angular/core';
import { TileName } from '../consts';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss',
})
export class TileComponent {
  @Input() tileType!: TileName;
}
