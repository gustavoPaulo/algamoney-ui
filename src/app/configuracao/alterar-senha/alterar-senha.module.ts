import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";

import { AlterarSenhaComponent } from './alterar-senha.component';
import { SharedModule } from '../../shared/shared.module';
import { AlterarSenhaRoutingModule } from "./alterar-senha-routing.module";

@NgModule({
  declarations: [
    AlterarSenhaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SharedModule,
    RouterModule,
    AlterarSenhaRoutingModule
  ],
  exports: []
})

export class AlterarSenhaModule {}
