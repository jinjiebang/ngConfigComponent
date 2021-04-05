import { Component, Input } from '@angular/core';
import { NzModalComponent } from 'ng-zorro-antd/modal';
import { ConfirmData, IConfigModal, ICustomModal, IModalType } from 'src/app/components/config-modal/config-modal.component';

export type Modal = ICustomModal<string, number, number>
export type ConfigModal = IConfigModal<string, number, number>
@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss']
})
export class CustomModalComponent implements Modal {
  @Input() configModal!: ConfigModal;
  public customFooter: boolean = false;
  public okDisabled: boolean = true
  public confirmData: ConfirmData<number> = {data:1,type:IModalType.ADD};

  constructor() { }

  public initModal(configModal:ConfigModal, modalRef: NzModalComponent) {
    this.configModal = configModal;
    modalRef.nzOkDisabled = this.okDisabled;
    modalRef.nzFooter = this.customFooter ? null : undefined;
    this.configModal.updateModalConfig();

  }

  public initData(data: string): Promise<number> {
    return new Promise((resolve, reject) => {
      console.log('initData')
      setTimeout(()=>{
        console.log('initData complete')
        resolve(0);
      },200)
    })
  }

  public onOpen(data: number, type: IModalType): void {
    console.log('onOpen', data, type);
  };

  public onConfirm() {
    this.configModal.confirm(this.confirmData)
  }
  public onCancel() {
    this.configModal.cancel();
  }


}
