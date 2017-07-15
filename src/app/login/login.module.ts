import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../theme/nga.module';
import { MessagesModule } from 'primeng/primeng';
import { Login } from './login.component';
import { routing } from './login.routing';

import { AuthenticationService } from './authentication.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    MessagesModule
  ],
  declarations: [
    Login
  ],
  providers: [AuthenticationService,AuthGuard]
})
export class LoginModule {}
