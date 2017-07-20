import { Injectable } from '@angular/core';

@Injectable()
export class ArrayExtensionsService {

  constructor() {
    configureExtensionMethods();
  }
}

function configureExtensionMethods() {
  Array.prototype.distinct = function(a){return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b + 1) < 0; });
  Array.prototype.flatMap = function<U>() { return <U[]>this.reduce((a, b) => a.concat(b)); };

  Array.prototype.groupBy = function<T>(prop: string) {
    return this.reduce((items, item) => {
      const keyName = item[prop];

      items[keyName] = items[keyName] || <IGroup<T>>{ key: keyName, values: <T[]>[] };
      items[keyName].values.push(item);

      return items;
    }, <IGroup<T>[]>[]);
  };

  Array.prototype.groupByFunc = function<T>(func: Function) {
    return this.reduce((items, item) => {
      const keyName = func(item);

      items[keyName] = items[keyName] || <IGroup<T>>{ key: keyName, values: <T[]>[] };
      items[keyName].values.push(item);

      return items;
    }, <IGroup<T>[]>[]);
  };
}

declare global {
  interface Array<T> {
    distinct(): Array<T>;
    flatMap<U>(): Array<U>;
    groupBy(prop: string): IGroup<T>[];
    groupByFunc(func: any): IGroup<T>[];
  }
}

interface IGroup<T> {
  key: string;
  values: T[];
}
