import * as React from 'react';
import * as inflection from 'inflection';
import * as moment from 'moment';
import { Input, FormField } from 'webpanel-antd';
import { Input as AntdInput, InputNumber } from 'antd';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';

import { DatePicker } from '../components/date-picker';
import { Entity } from './Entity';
import { RelationField } from '../components/relation-field';
import { Thunk, getThunkValue } from '../thunk';

export interface IEntityFieldInput {
  type?: 'string' | 'number' | 'text' | 'date' | 'datetime' | 'boolean';
}

export interface IEntityFieldRelationship {
  type?: 'relationship';
  targetEntity?: Thunk<Entity<any>>;
  toMany?: boolean;
}

export interface IEntityFieldBaseConfig<T> {
  name: string;
  title?: string;
  visibility?: {
    list?: boolean;
    detail?: boolean;
    search?: boolean;
  };
  render?: (record: T) => React.ReactNode;
}

export type IEntityFieldConfig<T> = IEntityFieldBaseConfig<T> &
  (IEntityFieldInput | IEntityFieldRelationship);

export class EntityField<T> {
  constructor(
    private readonly config: IEntityFieldConfig<T>,
    public readonly entity: Entity<any>
  ) {}

  public get title(): string {
    return inflection.transform(this.config.title || this.config.name, [
      'underscore',
      'titleize'
    ]);
  }

  public get name(): string {
    return this.config.name;
  }

  public get fetchField(): string {
    let name = this.config.name;
    if (this.config.type === 'relationship' && this.config.targetEntity) {
      const searchFields = getThunkValue(this.config.targetEntity)
        .searchableFields;

      name += `{ id ${searchFields.map(f => f.name).join(' ')}}`;
    }
    return name;
  }

  public visible(
    type: 'list' | 'detail' | 'searchable',
    strict: boolean = false
  ): boolean {
    if (strict && !this.config.visibility) {
      return false;
    }
    return !this.config.visibility || !!this.config.visibility[type];
  }

  public get render(): ((record: T) => React.ReactNode) | undefined {
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
        case 'boolean':
          return value => (value ? '✓' : '✗');
        case 'relationship':
          const { targetEntity, toMany } = this
            .config as IEntityFieldRelationship;
          if (targetEntity) {
            const render = getThunkValue(targetEntity).render;
            return value => {
              if (toMany && Array.isArray(value)) {
                return value
                  .map(x => render && render(x))
                  .filter(x => x)
                  .join(', ');
              }
              return render && render(value);
            };
          }
      }
    } else {
      return (record: T) => {
        return render(record);
      };
    }
    return undefined;
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
        return <DatePicker />;
      case 'datetime':
        return <DatePicker showTime={true} />;
    }
    return `unknown type ${type}`;
  }

  public fieldElement(
    formContext: FormContext,
    key: string | number
  ): React.ReactNode {
    const { type } = this.config;

    if (type === 'relationship') {
      return this.relationshipFieldElement(
        formContext,
        this.config as IEntityFieldRelationship,
        key
      );
    }

    return (
      <FormField
        key={key}
        label={this.title}
        name={this.name}
        formContext={formContext}
      >
        {this.inputElement()}
      </FormField>
    );
  }

  private relationshipFieldElement(
    formContext: FormContext,
    config: IEntityFieldRelationship,
    key: string | number
  ): React.ReactNode {
    const { toMany, targetEntity } = config;
    if (!targetEntity) {
      return `targetEntity must be provided in field configuration`;
    }
    return (
      <RelationField
        key={key}
        formContext={formContext}
        field={this}
        targetEntity={getThunkValue(targetEntity)}
        mode={toMany ? 'tags' : 'default'}
      />
    );
  }
}
