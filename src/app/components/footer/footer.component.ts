import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() menuItems: Array<string> | undefined;
  @Input() creators: Array<string> | undefined;
  @Input() address: string | undefined;
  
  constructor() { }

  ngOnInit(): void { 
    console.log(this.menuItems)
  }
}
