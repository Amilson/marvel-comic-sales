import { AbstractControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { OnDestroy, Directive } from '@angular/core';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelPaginationOptions, MarvelTranslateOptions } from 'app/interfaces';
import { takeUntil } from 'rxjs/operators';
import { MarvelUtils } from 'marvel-style';

@Directive({
  selector: '[baseComponent]',
})
export abstract class BaseComponent implements OnDestroy {
  __marvelFormErrors: any | any[];

  __unsubscribeAll: Subject<any>;

  __paginationOptions: MarvelPaginationOptions;

  __i18n: any;

  private paginationFunc: Function;

  protected constructor() {
    this.__unsubscribeAll = new Subject();
  }

  private handlePagination(create = true) {
    const { __paginationOptions } = this;
    if (__paginationOptions) {
      const { mainElement, service } = __paginationOptions;
      const element = document.getElementById(mainElement);
      if (element) {
        if (create) {
          this.paginationFunc = () => {
            const { scrollTop, scrollHeight, offsetHeight } = element;
            const contentHeight = scrollHeight - offsetHeight;
            if (contentHeight <= scrollTop) {
              service.__onDoPagination$.next(true);
            }
          };
          element.addEventListener('scroll', this.paginationFunc.bind(this));
        } else {
          element.removeEventListener('scroll', this.paginationFunc.bind(this));
        }
      }
    }
  }

  private handleTranslate(translateOptions: MarvelTranslateOptions) {
    const { service } = translateOptions;
    service.__oni18nDataChanged$.pipe(takeUntil(this.__unsubscribeAll)).subscribe(() => {
      const data = service.__i18n;
      if (data) {
        this.__i18n = data;
      }
    });
  }

  private getErrorFirstMessageTranslated(formControl: AbstractControl) {
    if (formControl.hasError('required')) return 'FIELD-REQUIRED';
    if (formControl.hasError('invalid')) return 'FIELD-INVALID';
    if (formControl.hasError('email')) return 'INVALID-EMAIL';
    if (formControl.hasError('minlength')) return 'MIN-LENGTH';
    if (formControl.hasError('maxlength')) return 'MAX-LENGTH';
    if (formControl.hasError('max')) return 'MAX';
    if (formControl.hasError('min')) return 'MIN';
    if (formControl.hasError('passwordsNotMatching')) return 'MATCH-PASSWORD';
    if (formControl.hasError('invalidDate')) return 'INVALID-DATE';
    if (formControl.hasError('invalidTrue')) return 'INVALID-TRUE';

    return 'FIELD-INVALID';
  }

  private getErrorLastMessageNotTranslated(formControl: AbstractControl) {
    if (formControl.hasError('minlength')) {
      return `${formControl.getError('minlength').requiredLength} caracteres.`;
    }
    if (formControl.hasError('maxlength')) {
      return `${formControl.getError('maxlength').requiredLength} caracteres.`;
    }
    if (formControl.hasError('max')) return `${formControl.getError('max').max}`;
    if (formControl.hasError('min')) return `${formControl.getError('min').min}`;

    return '';
  }

  public validateFormWithTranslate(f: FormGroup, index?: number): boolean {
    const formErrors: any = f.value;

    if (f.status === 'VALID') return true;

    if (!formErrors) return true;
    Object.entries(formErrors).forEach(([key, value]) => {
      const control = f.get(key);
      formErrors[key] = '';
      if (control && !control.valid) {
        const msg = {
          first: `ERRORS.${this.getErrorFirstMessageTranslated(f.get(key))}`,
          last: this.getErrorLastMessageNotTranslated(f.get(key)),
        };
        formErrors[key] = msg;
      }
    });

    /*TODO if (MarvelUtils.persistNullEmptyUndefined(index)) this.__marvelFormErrors[index] = formErrors;
    else {
      this.__marvelFormErrors = formErrors;
    }*/

    return false;
  }

  public formatGovernmentId(governmentId: string): string {
    if (!governmentId) {
      return governmentId;
    }
    // TODO return MarvelUtils.formatDocumentWithMask(governmentId, true);
  }

  public copyToClipboard(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  public validateForm(f: FormGroup, index?: number, alias?: string): boolean {
    const formErrors: any = f.value;

    if (f.status === 'VALID') return true;

    if (!formErrors) return true;
    Object.entries(formErrors).forEach(([key, value]) => {
      const control = f.get(key);
      formErrors[key] = '';
      if (control && !control.valid) {
        const msg = {
          firstMessage: `ERRORS.${this.getErrorFirstMessageTranslated(f.get(key))}`,
          lastMessage: this.getErrorLastMessageNotTranslated(f.get(key)),
        };
        formErrors[key] = msg;
      }
    });

    if (MarvelUtils.persistNullEmptyUndefined(index)) {
      this.__marvelFormErrors[index] = formErrors;
    } else {
      let obj: any;

      if (alias) {
        obj = {
          [alias]: {
            ...formErrors,
          },
        };
      } else {
        obj = formErrors;
      }

      this.__marvelFormErrors = {
        ...this.__marvelFormErrors,
        ...obj,
      };
    }
    f.markAllAsTouched();
    return false;
  }

  public clearAllServiceData(clearData: boolean) {
    const context = this;
    Object.values(context).forEach((ctx: any) => {
      if (ctx instanceof MarvelCommonsService) {
        ctx.clear(clearData);
      }
    });
  }

  public ngOnInit(args: {
    paginationOptions?: MarvelPaginationOptions;
    translateOptions?: MarvelTranslateOptions;
  }) {
    if (args?.paginationOptions) {
      this.__paginationOptions = args?.paginationOptions;
      this.handlePagination();
    }
    if (args?.translateOptions) {
      this.handleTranslate(args?.translateOptions);
    }
  }

  public ngOnDestroy(clearData: boolean = true) {
    this.__unsubscribeAll.next();
    this.__unsubscribeAll.complete();
    this.clearAllServiceData(clearData);
  }

  public goBack() {
    window.history.back();
  }
}
