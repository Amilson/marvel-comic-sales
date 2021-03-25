import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { Location } from '@angular/common';
import { MarvelUtils } from '../../utils';
import { MarvelModalComponent } from '../../../components';
import { MarvelModalConfig, MarvelModalRefs } from '../../interfaces';

@Injectable()
export class MarvelStyleModalService {
  private dialogComponentRef: MarvelModalRefs<MarvelModalComponent>[] = [];

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private locationRouter: Location
  ) {
    this.locationRouter.onUrlChange(() => {
      this.closeAll();
    });
  }

  open(component: any, config: MarvelModalConfig): MarvelModalRefs<MarvelModalComponent> {
    const componentFactory = this.resolver.resolveComponentFactory(component);
    const componentRef: any = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);

    const refRet = {
      id: `marvel-modal-${MarvelUtils.getRandomString(30)}`,
      component: componentRef,
    };

    componentRef.instance.config = config;
    componentRef.instance.modalRef = refRet;

    const domElem = componentRef?.hostView?.rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    document.body.classList.add('marvel-marvel-open');

    this.dialogComponentRef.push(refRet);
    return refRet;
  }

  close(ref: MarvelModalRefs<MarvelModalComponent>) {
    this.appRef.detachView(ref.component.hostView);
    ref.component.destroy();
    this.dialogComponentRef = this.dialogComponentRef.filter(({ id }) => id !== ref.id);
    if (this.dialogComponentRef.length === 0) {
      document.body.classList.remove('marvel-marvel-open');
    }
  }

  closeAll() {
    this.dialogComponentRef.forEach((val: MarvelModalRefs<MarvelModalComponent>) => {
      this.appRef.detachView(val.component.hostView);
      val.component.destroy();
    });
    this.dialogComponentRef = [];
    document.body.classList.remove('marvel-marvel-open');
  }
}
