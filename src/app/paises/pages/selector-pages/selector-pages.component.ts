import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { PaisSmall, pais } from '../../interfaces/paises.Interfaces';
import { observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-pages',
  templateUrl: './selector-pages.component.html',
  styleUrls: ['./selector-pages.component.css']
})
export class SelectorPagesComponent  implements OnInit{

    miFormulario:FormGroup = this.fb.group({
      region:['',Validators.required],
      pais:['',Validators.required],
      frontera:['',Validators.required]
    })

    //llenar selectores
    regiones:string[]=[];
    paises : PaisSmall[]=[];
    fronteras: string[]=[];
    constructor(private fb:FormBuilder, private paisesService:PaisesService){}

    ngOnInit(): void {
      this.regiones = this.paisesService.regiones;

      //cuando cambie la region

    
      // this.miFormulario.get('region')?.valueChanges
      // .subscribe(region=>{
      //   console.log(region);
      //   this.paisesService.getPaisesPorRegion(region)
      //   .subscribe(paises =>{
      //       this.paises = paises
      //       console.log(paises);
      //   })
      // })

      //el switchMap  toma el valor producto de un observable
     // y a su vez lo muta y regresa el valor de otro observable

      this.miFormulario.get('region')?.valueChanges //cada vez que region cambia 
      .pipe(
        tap( _ =>{ // lo detecto y hago un reset de el campo
          this.miFormulario.get('pais')?.reset('');
        }),
        switchMap(region =>this.paisesService.getPaisesPorRegion(region))// vuelvo a busar la region
      )
      .subscribe(paises => { //lo meto al array
        this.paises = paises
        console.log(paises);
        
      })

      //para pais
      this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap( _ =>{ 
 
          this.miFormulario.get('frontera')?.reset('');
        }),
        switchMap(code => this.paisesService.getPaisPorAlphaCode(code ))
      )
      .subscribe(pais => {
        this.fronteras = pais?.borders ||[];
        console.log(pais);
        
      })
      

      }

    
    guardar(){

    }
}
