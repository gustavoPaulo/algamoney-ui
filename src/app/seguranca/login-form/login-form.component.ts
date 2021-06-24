import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit{

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private router: Router
    ) { }


  ngOnInit() {
    this.title.setTitle('Algamoney - Login');
  }

  login(usuario: string, senha: string, loginForm: FormControl) {
    this.auth.login(usuario, senha)
      .then(() => {
        loginForm.reset();
        this.router.navigate(['/dashboard']);
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
        loginForm.reset();
      });
  }

}
