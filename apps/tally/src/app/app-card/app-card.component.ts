/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tally-utility-app-card',
  template: `
    <div class="app-card {{ className }}">
      <a
        routerLink="/{{ link }}"
        routerLinkActive="active"
        ariaCurrentWhenActive="page"
        >{{ name }}</a
      >
    </div>
  `,
  styleUrls: ['./app-card.component.css'],
})
export class AppCardComponent implements OnInit {
  @Input()
  name!: string;

  @Input()
  link!: string;
  @Input()
  className!: string;

  constructor() {}

  ngOnInit(): void {}
}
