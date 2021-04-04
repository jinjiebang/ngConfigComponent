import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IControlConfig, IControlValue } from '../config-form/config-form-model';

@Component({
  selector: 'app-config-form-item',
  templateUrl: './config-form-item.component.html',
  styleUrls: ['./config-form-item.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ConfigFormItemComponent),
    multi: true
  }]
})
export class ConfigFormItemComponent implements OnInit, ControlValueAccessor {
  @Input() public config!: IControlConfig;
  @Input() public formGroup!: FormGroup;
  private _value: IControlValue = null;
  public onChangFn: (value: IControlValue) => void = _ => {};
  public onTouchedFn: (value: any) => void = _ => {};
  public set value(value: IControlValue) {
    this._value = value;
    this.onChangFn(value);
  }
  public get value(): IControlValue {
    return this._value;
  }

  public get control(): FormControl {
    const control = this.config.control as FormControl;
    return control;
  }
  constructor() { }
  writeValue(obj: any): void {
    this._value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChangFn = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public showError(control: FormControl) {
    const config = this.config;
    return config.showError ? config.showError(control, this.config) : []
  }

  ngOnInit() {
  }

}
