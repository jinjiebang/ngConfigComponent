import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IControlConfig } from '../config-form/config-form-model';

@Pipe({
  name: 'showErrors',
  pure: true,
})
export class ShowErrorsPipe implements PipeTransform {

  transform(control: FormControl, config: IControlConfig): any {
    const errors = control.errors;
    const dirty = control.dirty;
    if (!errors || !dirty) return [];
    if (config.showError) return config.showError(control, config);
    return Object.keys(errors).map(key => {
      const error = errors[key];
      if (key === 'required') {
        return `请输入${config.label}`;
      } else if (key === 'min') {
        return `${config.label}最小值是${error.min}`
      } else if (key === 'max') {
        return `${config.label}最大值是${error.max}`
      } else if (key === 'minlength') {
        return `${config.label}最小长度是${error.requiredLength}`
      } else if (key === 'maxlength') {
        return `${config.label}最大长度是${error.requiredLength}`
      } else {
        return 'unkownn error';
      }
    })
  }

}
