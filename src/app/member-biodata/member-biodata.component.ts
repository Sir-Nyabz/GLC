import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-member-biodata',
  templateUrl: './member-biodata.component.html',
  styleUrls: ['./member-biodata.component.css']
})
export class MemberBiodataComponent implements OnInit {

  constructor(private location:Location) { }

  ngOnInit(): void {
    window.location.reload()
  }

}
