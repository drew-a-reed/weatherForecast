import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  referringUrl: string | null = null;

  ngOnInit() {
    this.setLinkText();
  }

  setLinkText() {
    this.referringUrl = document.referrer;
    const linkElement = document.querySelector(".header a") as HTMLElement;

    if (linkElement) {
      const linkText = this.referringUrl === 'https://www.drewareed.com/'
        ? 'Return to my profile'
        : linkElement.textContent || linkElement.innerText;
      linkElement.textContent = linkText;
    }
  }
}
