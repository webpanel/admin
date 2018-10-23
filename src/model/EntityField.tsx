import * as React from 'react';
import * as inflection from 'inflection';
import { Input, FormField } from 'webpanel-antd';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';

// import { EntityField } from './_EntityField';
import { Entity } from './Entity';
import { ValidationRule } from 'antd/lib/form/Form';

type FieldSections = 'list' | 'detail' | 'edit' | 'search' | 'custom';

export interface IEntityFieldConfig<T> {
  title?: string;
  visible?: FieldSections[];
  hidden?: FieldSections[];
  render?: (record: T) => React.ReactNode;
  rules?: ValidationRule[];
}

export class EntityField<T, C extends IEntityFieldConfig<T>> {
  constructor(
    public readonly name: string,
    protected readonly config: C,
    public readonly entity: Entity<any>
  ) {}

  public get title(): string {
    return inflection.transform(this.config.title || this.name, [
      'underscore',
      'titleize'
    ]);
  }

  public get columnName(): string {
    return this.name;
  }
  public get fetchField(): string {
    return this.name;
  }

  public visible(section: FieldSections, strict: boolean = false): boolean {
    const { visible, hidden } = this.config;
    if (strict && !visible) {
      return false;
    }
    if (visible && visible.indexOf(section) === -1) {
      return false;
    }
    if (hidden && hidden.indexOf(section) !== -1) {
      return false;
    }
    return true;
  }

  public get render(): ((record: T) => React.ReactNode) {
    return (values: any) => {
      return values[this.name];
    };
  }

  public inputElement(props?: {
    value?: any;
    onChange?: (value: any) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    const onChange = props && props.onChange;
    const onChangeProp = onChange
      ? (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)
      : undefined;
    return <Input {...props} onChange={onChangeProp} />;
  }

  public get valuePropName(): string {
    return 'value';
  }

  public fieldElement(
    field: EntityField<T, C>,
    formContext: FormContext,
    key: string | number
  ): React.ReactNode {
    return (
      <FormField
        key={key}
        label={field.title}
        name={field.columnName}
        formContext={formContext}
        valuePropName={this.valuePropName}
        rules={field.config.rules}
      >
        {this.inputElement()}
      </FormField>
    );
  }
}
