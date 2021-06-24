import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { SharedModule } from './../shared/shared.module';

import { CategoriaGridComponent } from './categoria-grid/categoria-grid.component';
import { CategoriaPesquisaComponent } from './categoria-pesquisa/categoria-pesquisa.component';
import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';
import { CategoriasRoutingModule } from './categorias-routing.module';

@NgModule({
  declarations: [
    CategoriaCadastroComponent,
    CategoriaPesquisaComponent,
    CategoriaGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    DropdownModule,
    SelectButtonModule,
    InputMaskModule,

    CurrencyMaskModule,

    SharedModule,
    RouterModule,
    CategoriasRoutingModule
  ],
  exports: []
})
export class CategoriaModule { }
