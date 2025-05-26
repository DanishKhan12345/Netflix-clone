import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input({required : true}) userImg : string = "";
  navList = [ "Home", "TV Shows", "Movies", "My List", "Browse by Languages", "News & Popular"]
}
