import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-selector-pages',
  templateUrl: './selector-pages.component.html',
  styleUrls: ['./selector-pages.component.css']
})
export class SelectorPagesComponent {

    miFormulario:FormGroup = this.fb.group({
      region:['',Validators.required]
    })


    constructor(private fb:FormBuilder){}

    guardar(){
      
    }
}
