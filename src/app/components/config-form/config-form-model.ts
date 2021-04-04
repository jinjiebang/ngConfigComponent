import { FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
export type IControlValue = string | number | null;
export type IType = 'input' | 'select';
export type IControlType = 'group' | 'control' | 'array';
export interface IOption {
  label: string;
  value: any;
}
export interface IControlConfig {
  type: IType;
  label: string;
  key: string;
  value: IControlValue;
  controlType: IControlType;
  rowIndex: number;
  span: number;
  offset: number;
  layout: number[];
  validators: ValidatorFn | ValidatorFn[];
  showError?: (control: FormControl, config: IControlConfig) => string[];
  onChange?: (value: IControlValue, form: FormGroup, formConfig: IControlConfig[], updateForm:()=>void) => void;
  children?: IControlConfig[];
  control?: FormControl | FormGroup | FormArray;
  options?: IOption[];
}
