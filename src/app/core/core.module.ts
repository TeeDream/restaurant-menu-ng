import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { LogoSvgComponent } from './components/logo-svg/logo-svg.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LogoSvgComponent],
  imports: [CommonModule, RouterLink, MaterialModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
