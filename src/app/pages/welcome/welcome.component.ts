import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { IControlConfig } from 'src/app/components/config-form/config-form-model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public formConfig: IControlConfig[] = [
    {
      label: '输入',
      key: 'key',
      value: 1,
      rowIndex: 0,
      type: 'input',
      span: 12,
      offset: 0,
      layout: [6, 18],
      options: [
        {
          label: '1',
          value: 1
        },
        {
          label: '2',
          value: 2
        }
      ],
      onChange: () => { },
      validators: [Validators.required],
      controlType: 'array',
      children: [
        {
          label: '输入2',
          key: 'key2',
          value: 1,
          rowIndex: 0,
          type: 'select',
          span: 12,
          offset: 0,
          layout: [4, 20],
          options: [
            {
              label: '1',
              value: 1
            },
            {
              label: '2',
              value: 2
            }
          ],
          onChange: (value, form, formConfig, updateForm) => {
             form.get('key3')?.setValue(2);
            if (!form.get('key4')) {
              const newControl = this.key4;
              formConfig.push(newControl);
              updateForm();
            }
          },
          validators: [Validators.required],
          controlType: 'control',
        }
      ]
    },
    {
      label: '输入3',
      key: 'key3',
      value: 1,
      rowIndex: 0,
      type: 'input',
      span: 12,
      offset: 0,
      layout: [4, 20],
      options: [
        {
          label: '1',
          value: 1
        },
        {
          label: '2',
          value: 2
        }
      ],
      onChange: () => { },
      validators: [Validators.required, Validators.min(2)],
      controlType: 'control',
    }
  ];
  key4: IControlConfig = {
    label: '输入3',
    key: 'key4',
    value: 1,
    rowIndex: 0,
    type: 'select',
    span: 12,
    offset: 0,
    layout: [4, 20],
    options: [
      {
        label: '1',
        value: 1
      },
      {
        label: '2',
        value: 2
      }
    ],
    onChange: () => { },
    validators: [Validators.required, Validators.min(2)],
    controlType: 'control',
  }
  constructor() { }

  ngOnInit() {
  }

}
