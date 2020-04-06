import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scrollToElement($tag): void {
    const element = document.querySelector($tag)
    console.log(element);
    if (element) {
      element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }
  }
}
