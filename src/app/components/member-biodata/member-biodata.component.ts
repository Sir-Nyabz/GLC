import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-member-biodata',
  templateUrl: './member-biodata.component.html',
  styleUrls: ['./member-biodata.component.css']
})
export class MemberBiodataComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    $('#contactbutton').click(function() {
      $('#contactform').show();
      $('#biodataform').hide();
  });

  $('#biodatabutton').click(function() {
    $('#contactform').hide();
    $('#biodataform').show();
});
  }

}
