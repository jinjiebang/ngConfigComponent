import { FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
export type IControlValue = string | number | null;
export interface IOption {
  label: string;
  value: any;
}
export interface IControlConfig {
  type: 'input' | 'select';
  span: number;
  offset: number;
  layout: number[];
  label: string;
  key: string;
  value: IControlValue;
  validators: ValidatorFn | ValidatorFn[];
  showError?: (control: FormControl, config: IControlConfig) => string[];
  onChange?: (value: IControlValue, form: FormGroup, formConfig: IControlConfig[], updateForm:()=>void) => void;
  rowIndex: number;
  controlType: 'group' | 'control' | 'array';
  children?: IControlConfig[];
  control?: FormControl | FormGroup | FormArray;
  options?: IOption[];
}
