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
      const linkText = this.referringUrl === 'http://localhost:55875/'
        ? 'Return to my profile'
        : linkElement.textContent || linkElement.innerText;

      console.log('Link Text:', linkText);

      // Your logic for setting link text based on the referring URL
      // For example, you can update the link element text content
      linkElement.textContent = linkText;
    }
  }
}
