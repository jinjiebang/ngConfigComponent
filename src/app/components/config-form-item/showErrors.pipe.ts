import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IControlConfig } from '../config-form/config-form-model';

export interface IErrorConfig {
  label: string;
  showError?: (control: FormControl, config: IErrorConfig) => string[]
}
@Pipe({
  name: 'showErrors',
  pure: true,
})
export class ShowErrorsPipe<T extends IErrorConfig> implements PipeTransform {

  transform(control: FormControl, config: T | string): string[] {
    const errors = control.errors;
    const dirty = control.dirty;
    if (!errors || !dirty) return [];
    let label:string
    if (typeof config === 'string') {
      label = config;
    } else {
      label = config.label;
      if (config.showError) return config.showError(control, config);
    }
    return Object.keys(errors).map(key => {
      const error = errors[key];
      if (key === 'required') {
        return `请输入${label}`;
      } else if (key === 'min') {
        return `${label}最小值是${error.min}`
      } else if (key === 'max') {
        return `${label}最大值是${error.max}`
      } else if (key === 'minlength') {
        return `${label}最小长度是${error.requiredLength}`
      } else if (key === 'maxlength') {
        return `${label}最大长度是${error.requiredLength}`
      } else {
        return 'unkownn error';
      }
    })
  }

}
