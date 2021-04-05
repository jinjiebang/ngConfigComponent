import { Component, Input } from '@angular/core';
import { ConfirmData, IConfigModal, ICustomModal, IModalType } from 'src/app/components/config-modal/config-modal.component';

export type Modal = ICustomModal<string, string, number>
export type ConfigModal = IConfigModal<string, string, number>
@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss']
})
export class CustomModalComponent implements Modal {
  // @Input() confirm!: (data: ConfirmData<number>) => void;
  // @Input() cancel!: () => void;
  // @Input() updateModalConfig!: () => void;
  // @Input() modalRef!: NzModalComponent
  public customFooter: boolean = false;
  public okDisabled: boolean = false;
  public _confirmData: ConfirmData<number> = { data: 1, type: IModalType.ADD };

  constructor() { }

  // public initModal = () => {
    // this.modalRef.nzOkDisabled = this.okDisabled;
    // this.modalRef.nzFooter = this.customFooter ? null : undefined;
    // this.updateModalConfig();
  // }
  public getConfirmData = () => {
    return this._confirmData;
  }

  public initData = (data: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      console.log('initData', data)
      setTimeout(() => {
        console.log('initData complete')
        resolve('ddd');
      }, 200)
    })
  }

  public onOpen = (data: string, type: IModalType): void => {
    console.log('onOpen', data, type);
  };

  public onConfirm() {
    // this.confirm(this._confirmData)
  }
  public onCancel() {
    // this.cancel();
  }


}
