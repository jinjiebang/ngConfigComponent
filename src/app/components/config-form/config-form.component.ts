import { Component, EventEmitter, Input, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IControlConfig } from './config-form-model';
import { Subscription } from 'rxjs';
import * as _ from "lodash";

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss']
})
export class ConfigFormComponent implements OnDestroy {
  @Input() formConfig: IControlConfig[] = [];
  @Input() rowGutter: number = 0;
  @Output() formChange = new EventEmitter<FormGroup>()
  public form: FormGroup;
  private isChangeMap: Map<string, boolean> = new Map();
  private onChange = () => { };
  private subscriptionList: Subscription[] = [];
  constructor(public fb: FormBuilder) {
    this.form = this.fb.group({});
  }
  ngOnDestroy(): void {
    this.clearSubsribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const formConfigChanges = changes.formConfig;
    if (formConfigChanges && formConfigChanges.currentValue) {
      this.initForm();
    }
  }
  private initForm(): void {
    this.buildForm();
    this.initControlConfig();
  }

  private buildForm(): void {
    const formGroup: any = {};
    this.formConfig.forEach((item) => {
      formGroup[item.key] = this.buildFormNode(item);
    })
    this.form = this.fb.group(formGroup);
    this.formChange.emit(this.form);
  }

  private buildFormNode(item: IControlConfig): any {
    if (item.controlType === 'control') {
      const control = this.fb.control(item.value, item.validators);
      item.control = control;
      this.isChangeMap.set(item.key, true)
      return control;
    }
    else if (item.controlType === 'group') {
      const result: any = {};
      const children = item.children;
      if (!children) return result;
      for (const child of children) {
        result[child.key] = this.buildFormNode(child);
      }
      return this.fb.group(result);
    }
    else if (item.controlType === 'array') {
      const array: any = [];
      const children = item.children;
      if (!children) return array;
      for (const child of children) {
        array.push(this.buildFormNode(child));
      }
      return this.fb.array(array);
    } else {
      return null;
    }
  }

  private initControlConfig() {
    const setConfig = (config: IControlConfig) => {
      config.onChange = config.onChange || this.onChange;
      if (config.children) {
        for (const child of config.children) {
          setConfig(child);
        }
      }
    }
    for (const config of this.formConfig) {
      setConfig(config);
      this.initOnChange(config)
    }
  }

  private resetConfig() {
    this.isChangeMap.clear();
    this.formConfig = _.cloneDeep(this.formConfig);
    this.clearSubsribe();
    this.initForm();
  }

  private clearSubsribe() {
    this.subscriptionList.forEach((sub) => {
      sub.unsubscribe()
    });
    this.subscriptionList = []
  }

  private initOnChange(config: IControlConfig) {
    if (config.control) {
      const control = config.control;
      const subscription = control.valueChanges.subscribe((value) => {
        const isChange = this.isChangeMap.get(config.key);
        if (!isChange) {
          this.isChangeMap.set(config.key, true);
        } else {
          config.value = value;
          if (config.onChange) {
            config.onChange(value, this.form, this.formConfig, () => {
              this.resetConfig();
            });
          }
        }
      });
      this.subscriptionList.push(subscription);
    }
    if (config.children) {
      for (let configItem of config.children) {
        this.initOnChange(configItem);
      }
    }
  }
}
