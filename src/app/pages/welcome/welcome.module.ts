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
import { NzTableModule} from 'ng-zorro-antd/table';
import { ShowErrorsPipe } from 'src/app/components/config-form-item/showErrors.pipe';
import { ConfigTableComponent } from 'src/app/components/config-table/config-table.component';

@NgModule({
  imports: [WelcomeRoutingModule, CommonModule, NzGridModule, FormsModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzSelectModule, NzModalModule, NzTableModule],
  declarations: [WelcomeComponent, ConfigFormComponent, ConfigFormItemComponent, LayoutPipe, ConfigModalComponent, CustomModalComponent, ShowErrorsPipe, ConfigTableComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
