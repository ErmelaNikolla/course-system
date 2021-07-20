import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() menuItems: any;
  @Input() creators: any;
  @Input() address: string | undefined;
  
  constructor() { }

  ngOnInit(): void { 
    console.log(this.menuItems)
  }
}
