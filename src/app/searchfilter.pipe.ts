import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';
import { Member } from './model/member.model';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(Members:Member[],searchValue:any): Member[] {
    if(!Members || !searchValue){
      return Members;
    }
    return Members.filter(membe=>
      membe.first_name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) 
      );
  }

}
