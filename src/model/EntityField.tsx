import { Input } from 'antd';
import * as React from 'react';
import * as inflection from 'inflection';
import { FormField  } from 'webpanel-antd';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';

import { Entity } from './Entity';
import { ValidationRule, FormLayout } from 'antd/lib/form/Form';
import { Thunk, resolveThunk, resolveOptionalThunk } from 'ts-thunk';
import { InputProps } from 'antd/lib/input';
import { ResourceCollection } from 'webpanel-data';

export type FieldSections = 'list' | 'detail' | 'edit' | 'search' | 'custom';
export type FieldPermission = 'read' | 'write';

export interface IEntityFieldConfig<T> {
  // header titles, bradcrumb names
  title?: Thunk<string>;
  // table columns title
  shortTitle?: Thunk<string>;
  enabled?: Thunk<boolean>;
  visible?: Thunk<FieldSections[]>;
  hidden?: Thunk<FieldSections[]>;
  permissions?: Thunk<FieldPermission[]>;
  render?: (record: T) => React.ReactNode;
  rules?: Thunk<ValidationRule[]>;
  attributes?: InputProps;
  sortable?: boolean;
  filter?: boolean;
  range?: boolean;
}

export class EntityField<T, C extends IEntityFieldConfig<T>> {
  constructor(
    public readonly name: string,
    protected readonly config: C,
    public readonly entity: Entity<any>
  ) {}

  public get title(): string {
    return (
      resolveOptionalThunk(this.config.title) ||
      inflection.transform(this.name, ['underscore', 'titleize'])
    );
  }

  public get shortTitle(): string {
    return resolveOptionalThunk(this.config.shortTitle) || this.title;
  }

  public get columnName(): string {
    return this.name;
  }
  public get fetchField(): string {
    return this.name;
  }
  public get sortable(): boolean {
    return this.config.sortable || false;
  }
  public get filter(): boolean {
    return this.config.filter || false;
  }
  public get range(): boolean {
    return this.config.range || false;
  }

  public visible(section: FieldSections, strict: boolean = false): boolean {
    const { visible, hidden, enabled } = this.config;
    if (enabled === false) {
      return false;
    }
    if (strict && !visible) {
      return false;
    }
    if (visible && resolveThunk(visible).indexOf(section) === -1) {
      return false;
    }
    if (hidden && resolveThunk(hidden).indexOf(section) !== -1) {
      return false;
    }
    return true;
  }

  public hasPermission(permission: FieldPermission): boolean {
    const { permissions } = this.config;
    if (permissions && resolveThunk(permissions).indexOf(permission) === -1) {
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
    return (
      <Input
        {...props}
        {...this.config.attributes || {}}
        onChange={onChangeProp}
      />
    );
  }

  public get valuePropName(): string {
    return 'value';
  }

  public updateFilterField = (
    resource: ResourceCollection,
    operationName: string,
    value: string,
    customName?: string,
  ) => {
    const filterName = `${customName || this.name}${operationName ? '_' : ''}${operationName}`;
    const filters = (
      resource.filters || {}
    )[this.name] || {};

    if (value) {
      filters[filterName] = value;
    } else {
      delete filters[filterName];
    }

    resource.updateNamedFilters(
      this.name,
      filters,
      true,
    );
  };

  public filterDropdownInput = (resource: ResourceCollection) => {
    return (
      <Input.Search
        onSearch={
          (value: string) =>
            this.updateFilterField(resource, 'like', value)
        }/>
    );
  };

  public filterDropdown = (resource: any) => {
    return () => (
      <div style={{
        display: 'flex',
        padding: '8px',
        backgroundColor: 'white',
        borderRadius: '6px',
        boxShadow: '0 1px 6px rgba(0, 0, 0, .2)',
      }}>
        {this.filterDropdownInput(resource)}
      </div>
    );
  };

  public fieldElement(
    formContext: FormContext,
    key: string | number,
    config: { formLayout?: FormLayout }
  ): React.ReactNode {
    const formItemLayout =
      config.formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
          }
        : null;

    return (
      <FormField
        key={key}
        label={this.title}
        name={this.columnName}
        formContext={formContext}
        valuePropName={this.valuePropName}
        rules={resolveOptionalThunk(this.config.rules)}
        {...formItemLayout}
      >
        {this.inputElement()}
      </FormField>
    );
  }
}
