import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { SharedModule } from './../shared/shared.module';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';


@NgModule({
  declarations: [RelatorioLancamentosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProgressSpinnerModule,

    SharedModule,
    CalendarModule,
    RelatoriosRoutingModule
  ]
})
export class RelatoriosModule { }
