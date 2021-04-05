import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { NzModalComponent } from 'ng-zorro-antd/modal';

export enum IModalType {
  ADD,
  EDIT
}
export type ConfirmData<R> = { type: IModalType, data: R }
export interface ICustomModal<T, U, R> {
  confirm?: (data: ConfirmData<R>) => void;
  cancel?: () => void;
  updateModalConfig?: () => void;
  modalRef?: NzModalComponent;
  // need component implement method
  initData?: (data: T) => Promise<U>;
  initModal?: () => void;
  getConfirmData: () => ConfirmData<R>;
  onOpen: (data: U, type: IModalType) => void;
}
export interface IConfigModal<T, U, R> {
  customComponent: Type<ICustomModal<T, U, R>>;
  onConfirm: EventEmitter<ConfirmData<R>>;
  onCancel: EventEmitter<T>;
  openModal: (data: T, type: IModalType) => void;
}
export interface ICustomModalConifg {
  customFooter?: boolean;
  okDisabled?: boolean;
}
@Component({
  selector: 'app-config-modal',
  templateUrl: './config-modal.component.html',
  styleUrls: ['./config-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigModalComponent<T, U, R> implements AfterViewInit, IConfigModal<T, U, R> {
  @Input() customComponent!: Type<ICustomModal<T, U, R>>
  @Output() onConfirm = new EventEmitter<ConfirmData<R>>();
  @Output() onCancel = new EventEmitter<T>();
  @ViewChild("content", { read: ViewContainerRef }) private contentContainer!: ViewContainerRef;
  @ViewChild(NzModalComponent) modalRef!: NzModalComponent;
  public visible: boolean = false;
  private customModal!: ICustomModal<T, U, R>;
  constructor(
    private factoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef,
  ) {
  }
  public ngAfterViewInit() {
    const factory = this.factoryResolver.resolveComponentFactory(this.customComponent);
    this.customModal = this.contentContainer.createComponent(factory).instance;
    this.customModal.confirm = this.confirm;
    this.customModal.cancel = this.cancel;
    this.customModal.updateModalConfig = this.updateModalConfig;
    this.customModal.modalRef = this.modalRef;
    if (this.customModal.initModal) {
      this.customModal.initModal();
    }
  }

  public async openModal(data: T, type: IModalType): Promise<void> {
    let newData: T | U = data;
    if (this.customModal.initData) {
      newData = await this.customModal.initData(data);
    }
    this.visible = true;
    this.cdr.detectChanges();
    this.customModal.onOpen(newData as U, type)
  }
  public onOK() {
    this.confirm(this.customModal.getConfirmData());
  }
  public updateModalConfig = () => {
    this.cdr.detectChanges();
  }
  public confirm = (data: ConfirmData<R>): void => {
    this.visible = false;
    this.cdr.detectChanges();
    this.onConfirm.emit(data);
  }
  public cancel = (): void => {
    this.visible = false;
    this.cdr.detectChanges();
    this.onCancel.emit();
  }

}
