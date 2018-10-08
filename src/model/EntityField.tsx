import * as React from 'react';
import * as inflection from 'inflection';
import * as moment from 'moment';
import { Input } from 'webpanel-antd';
import { Input as AntdInput, InputNumber } from 'antd';
import { DatePicker } from '../components/date-picker';

export interface IEntityFieldTextFieldInput {
  type?: 'string' | 'number' | 'text' | 'date' | 'datetime';
}

export interface IEntityFieldBaseConfig<T> {
  name: string;
  title?: string;
  visibility?: {
    list?: boolean;
    detail?: boolean;
  };
  render?: (text: any, record: T, index: number) => React.ReactNode;
}

export type IEntityFieldConfig<T> = IEntityFieldBaseConfig<T> &
  IEntityFieldTextFieldInput;

// export interface IEntityFieldConfig<T>
//   extends IEntityFieldBaseConfig {
//   render?: (text: any, record: any, index: number) => React.ReactNode;
// }

export class EntityField<T> {
  constructor(private readonly config: IEntityFieldConfig<T>) {}

  public get title(): string {
    return inflection.transform(this.config.title || this.config.name, [
      'underscore',
      'titleize'
    ]);
  }

  public get name(): string {
    return this.config.name;
  }

  public get render():
    | ((text: any, record: any, index: number) => React.ReactNode)
    | undefined {
    const { render, type } = this.config;
    if (!render) {
      switch (type) {
        case 'string':
        case 'text':
        case 'number':
          return undefined;
        case 'date':
        case 'datetime':
          return value => moment(value).calendar();
      }
    }
    return this.config.render;
  }

  public visible(type: 'list' | 'detail'): boolean {
    return !this.config.visibility || !!this.config.visibility[type];
  }

  public inputElement(): React.ReactNode {
    const { type } = this.config;
    if (!type) {
      return <Input />;
    }
    switch (type) {
      case 'string':
        return <Input />;
      case 'text':
        return <AntdInput.TextArea />;
      case 'number':
        return <InputNumber />;
      case 'date':
      case 'datetime':
        return <DatePicker />;
    }
    return `unknown type ${type}`;
  }
}
