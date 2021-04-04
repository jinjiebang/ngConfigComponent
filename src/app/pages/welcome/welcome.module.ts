import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigFormComponent } from 'src/app/components/config-form/config-form.component';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule} from 'ng-zorro-antd/select';
import { ConfigFormItemComponent } from 'src/app/components/config-form-item/config-form-item.component';
import { LayoutPipe } from 'src/app/components/config-form/layout.pipe';

@NgModule({
  imports: [WelcomeRoutingModule, CommonModule, NzGridModule, FormsModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzSelectModule],
  declarations: [WelcomeComponent, ConfigFormComponent, ConfigFormItemComponent, LayoutPipe],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
