import { MarvelServiceCredentials } from 'app/interfaces';
import { DecoratorsUtils } from 'app/core/utils';

export function MarvelCoreConstructor() {
  return (target) => {
    Object.entries(target.prototype).forEach(([key, value]) => {
      const method = target.prototype[key];
      if (key !== 'constructor') {
        target.prototype[key] = function (...args: any[]) {
          let context = this;
          if (DecoratorsUtils.hasMarvelServiceAndHandlingProperties(context)) {
            context['marvelService']['marvelHandlingService'].clearAll();
          }
          const result = method.apply(context, args);
          return result;
        };
      }
    });
    return target;
  };
}

export function MarvelCoreLog(tp: string) {
  return function (
    target: Object,
    propertyName: string,
    propertyDescriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = propertyDescriptor.value;
    propertyDescriptor.value = function (...args: any[]) {
      const params = args.map((a) => JSON.stringify(a)).join();
      const result = method.apply(this, args);
      const r = JSON.stringify(result);
      console.log(`Call: ${propertyName}(${params}) => ${r}`);
      return result;
    };

    return propertyDescriptor;
  };
}

export function MarvelCoreClearDecorators() {
  return function (
    target: Object,
    propertyName: string,
    propertyDescriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = propertyDescriptor.value;

    propertyDescriptor.value = function (...args: any[]) {
      let context = this;
      if (DecoratorsUtils.hasMarvelServiceAndHandlingProperties(context)) {
        context['marvelService']['marvelHandlingService'].clearAll();
      }
      const result = method.apply(context, args);
      return result;
    };

    return propertyDescriptor;
  };
}

export function MarvelCoreService(params: MarvelServiceCredentials) {
  return function (
    target: Object,
    propertyName: string,
    propertyDescriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = propertyDescriptor.value;

    propertyDescriptor.value = function (...args: any[]) {
      let context = this;
      if (DecoratorsUtils.hasMarvelServiceAndHandlingProperties(context)) {
        context['marvelService']['marvelHandlingService'].clearAll();
        context['marvelService']['marvelHandlingService'].setMarvelServiceCredentials(params);
      }
      const result = method.apply(context, args);
      return result;
    };

    return propertyDescriptor;
  };
}
