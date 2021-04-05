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
import { ConfigModalComponent } from 'src/app/components/config-modal/config-modal.component';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  imports: [WelcomeRoutingModule, CommonModule, NzGridModule, FormsModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzSelectModule, NzModalModule],
  declarations: [WelcomeComponent, ConfigFormComponent, ConfigFormItemComponent, LayoutPipe, ConfigModalComponent, CustomModalComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
