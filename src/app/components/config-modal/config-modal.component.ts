import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { NzModalComponent } from 'ng-zorro-antd/modal';

export enum IModalType {
  ADD,
  EDIT
}
export type ConfirmData<R> = { type: IModalType, data: R }
export interface ICustomModal<T, U, R> {
  onOpen: (data: U, type: IModalType) => void;
  initData: (data: T) => Promise<U>;
  initModal: (configModal: IConfigModal<T, U, R>, modalRef: NzModalComponent) => void;
  confirmData: ConfirmData<R>;
  configModal: IConfigModal<T, U, R>;
}
export interface IConfigModal<T, U, R> {
  customComponent: Type<ICustomModal<T, U, R>>;
  onConfirm: EventEmitter<ConfirmData<R>>;
  onCancel: EventEmitter<T>;
  openModal: (data: T, type: IModalType) => void;
  confirm: (data: ConfirmData<R>) => void;
  cancel: () => void;
  updateModalConfig: () => void
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
  private customModal!: ICustomModal<T, U, R>;
  public visible: boolean = false;
  constructor(
    private factoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef,
  ) {
  }
  ngAfterViewInit() {
    const factory = this.factoryResolver.resolveComponentFactory(this.customComponent);
    this.customModal = this.contentContainer.createComponent(factory).instance;
    this.customModal.initModal(this, this.modalRef);
  }

  public openModal(data: T, type: IModalType): void {
    this.customModal.initData(data).then((newData: U) => {
      this.visible = true;
      this.cdr.detectChanges();
      this.customModal.onOpen(newData, type)
    });
  }
  public updateModalConfig() {
    this.cdr.detectChanges();
  }
  public onOK() {
    this.confirm(this.customModal.confirmData);
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
