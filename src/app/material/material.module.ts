import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

const material=[
  MatButtonModule
]
@NgModule({
  exports: [
    material
  ],
  imports: [
    material
  ]
})
export class MaterialModule { }
