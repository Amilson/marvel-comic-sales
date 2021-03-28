import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MarvelModalConfig, MarvelModalRefs } from '../../core/interfaces';
import { MarvelStyleModalService } from '../../core/services/modal/marvel-style-modal.service';

@Component({
  selector: 'marvel-modal',
  template: `
    <mc-marvel-modal
      [ngClass]="
        'mc-marvel-modal mc-marvel-modal__' +
          (config?.color || 'theme') +
          ' mc-marvel-modal__size-' +
          config?.size || 'md'
      "
    >
      <div class="header" *ngIf="config?.title">
        <span class="title">
          {{ config?.title }}
        </span>
        <marvel-icon
          icon="x-circle-20"
          color="#161616"
          *ngIf="!config?.hideClose"
          class="close"
          (click)="onClose()"
        ></marvel-icon>
      </div>
      <div class="body">
        <ng-content></ng-content>
      </div>
      <mc-marvel-modal-footer
        [ngClass]="
          'mc-marvel-modal-footer mc-marvel-modal-footer__' +
          (config?.color || 'theme') +
          ' mc-marvel-modal-footer__size-' +
          (config?.size || 'md') +
          ' mc-marvel-modal-footer__' +
          ((config?.size || 'md') === 'sm' ? 'column' : 'row')
        "
      >
        <marvel-button
          [type]="config?.action?.confirm?.actionType || 'primary'"
          [color]="config?.action?.confirm?.actionColor || config?.color || 'theme'"
          (click)="_actionConfirm()"
          *ngIf="config?.action?.confirm"
        >
          {{ config?.action?.confirm?.label }}
        </marvel-button>
        <marvel-button
          [type]="config?.action?.cancel?.actionType || 'primary'"
          [color]="config?.action?.cancel?.actionColor || config?.color || 'theme'"
          (click)="_actionCancel()"
          *ngIf="config?.action?.cancel"
        >
          {{ config?.action?.cancel?.label }}
        </marvel-button>
        <marvel-button
          [type]="config?.action?.firstAction?.actionType || 'primary'"
          [color]="config?.action?.firstAction?.actionColor || 'theme'"
          [icon]="config?.action?.firstAction?.icon"
          [iconPosition]="config?.action?.firstAction?.iconPosition"
          (click)="_firstAction()"
          *ngIf="config?.action?.firstAction"
        >
          {{ config?.action?.firstAction?.label }}
        </marvel-button>
        <marvel-button
          [type]="config?.action?.secondAction?.actionType || 'primary'"
          [color]="config?.action?.secondAction?.actionColor || 'theme'"
          [icon]="config?.action?.secondAction?.icon"
          [iconPosition]="config?.action?.secondAction?.iconPosition"
          (click)="_secondAction()"
          *ngIf="config?.action?.secondAction"
        >
          {{ config?.action?.secondAction?.label }}
        </marvel-button>
        <marvel-button
          [type]="config?.action?.thirdAction?.actionType || 'primary'"
          [color]="config?.action?.thirdAction?.actionColor || 'theme'"
          [icon]="config?.action?.thirdAction?.icon"
          [iconPosition]="config?.action?.thirdAction?.iconPosition"
          (click)="_thirdAction()"
          *ngIf="config?.action?.thirdAction"
        >
          {{ config?.action?.thirdAction?.label }}
        </marvel-button>
      </mc-marvel-modal-footer>
    </mc-marvel-modal>
    <mc-marvel-modal-background></mc-marvel-modal-background>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelModalComponent implements OnInit {
  @Input() config: MarvelModalConfig;
  @Input() modalRef: MarvelModalRefs<this>;
  @Output() onHandleConfirm = new EventEmitter<any>();

  _actionCancel: Function;
  _actionConfirm: Function;
  _firstAction: Function;
  _secondAction: Function;
  _thirdAction: Function;

  constructor(private modalService: MarvelStyleModalService) {}

  ngOnInit() {
    this._actionCancel = () => {
      if (this.config?.action?.cancel?.action) {
        this.config?.action?.cancel?.action();
      }
      if (!this.config?.action?.cancel?.keepOnAction) {
        this.modalService.close(this.modalRef);
      }
    };
    this._actionConfirm = () => {
      this.onHandleConfirm.next(null);
      if (this.config?.action?.confirm?.action) {
        this.config?.action?.confirm?.action();
        if (!this.config?.action?.confirm?.keepOnAction) {
          this.modalService.close(this.modalRef);
        }
      }
    };
    this._firstAction = () => {
      if (this.config?.action?.firstAction?.action) {
        this.config?.action?.firstAction?.action();
        if (!this.config?.action?.firstAction?.keepOnAction) {
          this.modalService.close(this.modalRef);
        }
      }
    };
    this._secondAction = () => {
      if (this.config?.action?.secondAction?.action) {
        this.config?.action?.secondAction?.action();
        if (!this.config?.action?.secondAction?.keepOnAction) {
          this.modalService.close(this.modalRef);
        }
      }
    };
    this._thirdAction = () => {
      if (this.config?.action?.thirdAction?.action) {
        this.config?.action?.thirdAction?.action();
        if (!this.config?.action?.thirdAction?.keepOnAction) {
          this.modalService.close(this.modalRef);
        }
      }
    };
  }

  onClose() {
    this.modalService.close(this.modalRef);
  }
}
