import { Pipe, PipeTransform } from '@angular/core';
import { IControlConfig } from './config-form-model';

@Pipe({
  name: 'layout',
  pure: true
})
export class LayoutPipe implements PipeTransform {

  transform(configArr: IControlConfig[], args?: any): IControlConfig[][] {
    let layoutConfig: IControlConfig[][] = [];
    for (let i = 0; i < configArr.length; i++) {
      const control = configArr[i];
      layoutConfig[control.rowIndex] = layoutConfig[control.rowIndex] || [];
      layoutConfig[control.rowIndex].push(control)
      control.index = i;
    }
    return layoutConfig;
  }

}
