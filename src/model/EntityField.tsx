import * as React from 'react';
import * as inflection from 'inflection';

import { Button, Input, Tooltip } from 'antd';
import { FieldAction, fieldPermission } from './permissions';
import { FormLayout, ValidationRule } from 'antd/lib/form/Form';
import { Thunk, resolveOptionalThunk, resolveThunk } from 'ts-thunk';

import { Entity } from './Entity';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { FormField } from 'webpanel-antd';
import { InputProps } from 'antd/lib/input';
import { Translation } from 'react-i18next';

// import { ResourceCollection } from 'webpanel-data';

export type FieldSections = 'list' | 'detail' | 'edit' | 'search' | 'custom';

export interface IEntityFieldFilterProps<T> {
  selectedKeys: T[];
  setSelectedKeys: (keys: T[]) => {};
  confirm: () => {};
  clearFilters: () => {};
}

export interface IEntityFieldConfigFilter {
  range?: boolean;
}
const isIEntityFieldConfigFilter = (
  value: IEntityFieldConfigFilter | boolean | undefined
): value is IEntityFieldConfigFilter => {
  return typeof value === 'object';
};

export interface IEntityFieldConfig<T> {
  // header titles, bradcrumb names
  title?: Thunk<string>;
  description?: React.ReactNode;
  // table columns title
  shortTitle?: Thunk<string>;
  enabled?: Thunk<boolean>;
  listEditable?: Thunk<boolean>;
  visible?: Thunk<FieldSections[]>;
  hidden?: Thunk<FieldSections[]>;
  render?: (record: T) => React.ReactNode;
  rules?: Thunk<ValidationRule[]>;
  attributes?: InputProps;
  sortable?: boolean;
  filter?: IEntityFieldConfigFilter | boolean;
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

  public columnName(): string {
    return this.name;
  }
  public fetchField(): string | null {
    return this.name;
  }
  public get sortable(): boolean {
    return this.config.sortable || false;
  }
  public get filter(): boolean {
    if (typeof this.config.filter === 'boolean') {
      return this.config.filter;
    }
    return typeof this.config.filter !== 'undefined' || false;
  }
  public get range(): boolean {
    const filter = this.config.filter;
    if (isIEntityFieldConfigFilter(filter)) {
      return filter.range || false;
    }
    return false;
  }

  public get filterNormalize(): (values: any[]) => { [key: string]: any } {
    return (values: string[]) => {
      let res = {};
      if (values.length == 1) {
        res[this.columnName() + '_like'] = values[0] + '*';
      } else if (values.length > 1) {
        res[this.columnName() + '_in'] = values;
      }
      return res;
    };
  }

  public get filterDenormalize(): (values: { [key: string]: any }) => any[] {
    return (values: { [key: string]: any }) => {
      let res: any[] = [];
      if (values[this.columnName() + '_like']) {
        const val = values[this.columnName() + '_like'];
        res = [val.substring(0, val.length - 1)];
      } else if (values[this.columnName() + '_in']) {
        res = values[this.columnName() + '_in'];
      }
      return res;
    };
  }

  public visible(
    section: FieldSections,
    action: FieldAction,
    strict: boolean = false
  ): boolean {
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
    return fieldPermission(this, action);
  }

  public get render(): (record: T) => React.ReactNode {
    if (this.config.render) {
      return this.config.render;
    }
    return (values: any) => {
      const value = values[this.name] || '';
      if (!value || !value.substring || value.length < 50) {
        return value;
      }
      const shortValue = value.substring(0, 50) + '...';
      return <Tooltip title={value}>{shortValue}</Tooltip>;
    };
  }

  public inputElement(props?: {
    value?: any;
    onChange?: (value: any, stringValue: string) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    const onChange = props && props.onChange;
    const onChangeProp = onChange
      ? (e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value, e.target.value)
      : undefined;
    return (
      <Input
        key={`string_field_${this.entity.name}_${this.valuePropName}`}
        {...props}
        {...this.config.attributes || {}}
        onChange={onChangeProp}
      />
    );
  }

  public get valuePropName(): string {
    return 'value';
  }

  public fieldElement(
    formContext: FormContext,
    key: string | number,
    config: { formLayout?: FormLayout }
  ): React.ReactNode {
    const formItemLayout =
      config.formLayout === 'horizontal'
        ? {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 }
          }
        : null;

    return (
      <Translation>
        {t => (
          <FormField
            key={key}
            label={t(`${this.entity.name}.${this.name}`, {
              defaultValue: this.title
            })}
            extra={this.config.description}
            name={this.columnName()}
            formContext={formContext}
            valuePropName={this.valuePropName}
            rules={resolveOptionalThunk(this.config.rules)}
            {...formItemLayout}
          >
            {this.inputElement()}
          </FormField>
        )}
      </Translation>
    );
  }

  public filterDropdownInput = (props: IEntityFieldFilterProps<any>) => {
    const value = props.selectedKeys ? props.selectedKeys[0] : '';
    return (
      <Input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.setSelectedKeys(e.target.value ? [e.target.value] : []);
        }}
      />
    );
  };

  public filterDropdown = (resource: any) => {
    return (props: IEntityFieldFilterProps<any>) => {
      return (
        <div
          style={{
            display: 'flex',
            padding: '8px',
            backgroundColor: 'white',
            borderRadius: '6px',
            boxShadow: '0 1px 6px rgba(0, 0, 0, .2)'
          }}
        >
          {this.filterDropdownInput(props)}
          <Button
            disabled={!props.selectedKeys}
            onClick={() => props.confirm()}
            type="primary"
            icon="search"
          />
          <Button
            disabled={!props.selectedKeys}
            onClick={() => props.clearFilters()}
            icon="delete"
          />
        </div>
      );
    };
  };
}
