import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { NzTableComponent, NzTablePaginationPosition, NzTablePaginationType, NzTableSize } from 'ng-zorro-antd/table';
import { Subscription } from 'rxjs';
export interface ITableProps {
  nzPageIndex: number;
  nzPageSize: number;
  nzTotal: number;
  nzPaginationPosition: NzTablePaginationPosition;
  nzScroll: {
    x?: string | null;
    y?: string | null;
  };
  nzFrontPagination: boolean;
  nzShowPagination: boolean;
  nzLoading: boolean;
  nzSize: NzTableSize;
  nzShowSizeChanger: boolean;
  nzHideOnSinglePage: boolean;
  [key: string]: any;
}
export interface IColumnContext<T> {
  data: T,
  config: ITableColumn<T>;
}
export interface ITableColumn<T> {
  label: string;
  key: string;
  width?: string;
  template?: TemplateRef<IColumnContext<T>>
}
export interface ITableConfig<T> {
  props: Partial<ITableProps>;
  columns: ITableColumn<T>[];
}
@Component({
  selector: 'app-config-table',
  templateUrl: './config-table.component.html',
  styleUrls: ['./config-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigTableComponent<T extends { [key: string]: any }> implements OnChanges, AfterViewInit, OnDestroy {
  @Input() config!: ITableConfig<T>;
  @Input() data!: T[];
  @ViewChild(NzTableComponent) tableRef!: NzTableComponent;
  public props: ITableProps = {
    nzScroll: { y: '200px', x: "200px" },
    nzLoading: false,
    nzPageSize: 10,
    nzPageIndex: 1,
    nzTotal: 0,
    nzShowPagination: true,
    nzFrontPagination: true,
    nzHideOnSinglePage: false,
    nzPaginationPosition: "bottom",
    nzShowSizeChanger: true,
    nzSize: 'default'
  }
  private subscriptions: Subscription[] = [];
  constructor(private cdr: ChangeDetectorRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.props = { ...this.props, ...this.config.props };
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }
  ngAfterViewInit(): void {
    this.updateProps();
    this.cdr.detectChanges();
  }
  public updateProps(): void {
    if (!this.tableRef) return;
    const tableRef = this.tableRef as any;
    Object.keys(this.config.props).forEach((key) => {
      const propValue = tableRef[key];
      const configValue = (this.config.props as any)[key]
      if (propValue instanceof EventEmitter && typeof configValue === 'function') {
        const sub = propValue.subscribe((value) => {
          configValue(value);
        });
        this.subscriptions.push(sub);
      }
    });
  }

}
