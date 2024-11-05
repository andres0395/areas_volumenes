import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'areas_volumenes';
  private formBuilder = inject(FormBuilder);
  formTriangulo = this.formBuilder.nonNullable.group({
    altura:['',[Validators.required, Validators.pattern('^[0-9]*$'),Validators.min(1)]],
    base:['',[Validators.required, Validators.pattern('^[0-9]*$'),Validators.min(1)]]
  });
  formPrisma = this.formBuilder.nonNullable.group({
    altura:['',[Validators.required, Validators.pattern('^[0-9]*$'),Validators.min(1)]],
    ancho:['',[Validators.required, Validators.pattern('^[0-9]*$'),Validators.min(1)]],
    largo:['',[Validators.required, Validators.pattern('^[0-9]*$'),Validators.min(1)]]
  });
  viewMessageT = false;
  viewMessageP = false;
  resultT = '';
  resultP = '';
  ngOnInit(): void {
    initFlowbite();
  }
  calcularTriangulo(){
    if(this.formTriangulo.valid){
      this.viewMessageT = false;
      let base = !!this.formTriangulo.value.base ? +this.formTriangulo.value.base : 0;
      let altura = !!this.formTriangulo.value.altura ? +this.formTriangulo.value.altura : 0;
      this.resultT= 'El Area Del Triangulo es de: '+ ((base*altura)/2) + 'mt2';
      this.formTriangulo.reset();
    }
    else{
      this.viewMessageT = true;
      this.resultT ='';
    }
  }
  calcularPrisma(){
    if(this.formPrisma.valid){
      this.viewMessageP = false;
      let ancho = !!this.formPrisma.value.ancho ? +this.formPrisma.value.ancho : 0;
      let largo = !!this.formPrisma.value.largo ? +this.formPrisma.value.largo : 0;
      let altura = !!this.formPrisma.value.altura ? +this.formPrisma.value.altura : 0;
      this.resultP= 'El Volumen de un Prisma Rectangular es de: '+ (largo*ancho*altura) + 'mt2';
      this.formPrisma.reset();
    }
    else{
      this.viewMessageP = true;
      this.resultP ='';
    }
  }
}
