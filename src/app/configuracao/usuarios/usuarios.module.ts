import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputTextareaModule } from "primeng/inputtextarea";
import { SelectButtonModule } from "primeng/selectbutton";
import { TableModule } from "primeng/table";
import { TooltipModule } from "primeng/tooltip";
import { CheckboxModule } from 'primeng/checkbox';

import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';
import { UsuarioGridComponent } from './usuario-grid/usuario-grid.component';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    UsuarioCadastroComponent,
    UsuarioGridComponent,
    UsuarioPesquisaComponent
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

    CheckboxModule,

    SharedModule,
    RouterModule,
    UsuariosRoutingModule
  ],
  exports: []
})

export class UsuariosModule {}
