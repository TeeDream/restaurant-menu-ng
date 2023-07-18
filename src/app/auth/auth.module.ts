import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MaterialModule } from '@src/app/shared/material.module';
import { SharedModule } from '@src/app/shared/shared.module';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent],
  imports: [CommonModule, MaterialModule, SharedModule],
})
export class AuthModule {}
