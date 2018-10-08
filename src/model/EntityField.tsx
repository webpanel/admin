import * as React from 'react';
import * as inflection from 'inflection';
import { Input } from 'webpanel-antd';
import { Input as AntdInput, InputNumber } from 'antd';
import { DatePicker } from '../components/date-picker';

export interface IEntityFieldTextFieldInput {
  type: 'string' | 'number' | 'text' | 'date' | 'datetime';
}

export interface IEntityFieldConfig {
  name: string;
  title?: string;
  visibility?: {
    list?: boolean;
    detail?: boolean;
  };
  input: IEntityFieldTextFieldInput;
}

export class EntityField {
  constructor(private readonly config: IEntityFieldConfig) {}

  public get title(): string {
    return inflection.transform(this.config.title || this.config.name, [
      'underscore',
      'titleize'
    ]);
  }

  public get name(): string {
    return this.config.name;
  }

  public visible(type: 'list' | 'detail'): boolean {
    return !this.config.visibility || !!this.config.visibility[type];
  }

  public inputElement(): React.ReactNode {
    const { input } = this.config;
    switch (input.type) {
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
    return <Input type={input.type} />;
  }
}
