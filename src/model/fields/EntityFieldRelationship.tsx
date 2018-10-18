import * as React from 'react';
import { ResourceCollectionLayer, ResourceCollection } from 'webpanel-data';

import { EntityField, IEntityFieldConfig } from '../EntityField';
import { Entity } from '../Entity';
import { FormField, ResourceSelect } from 'webpanel-antd';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { getThunkValue, Thunk } from '../../thunk';

export interface IEntityFieldRelationshipConfig<T>
  extends IEntityFieldConfig<T> {
  targetEntity: Thunk<Entity<any>>;
  type?: 'toOne' | 'toMany';
  mode?: 'default' | 'multiple';
}

export class EntityFieldRelationship<T> extends EntityField<
  T,
  IEntityFieldRelationshipConfig<T>
> {
  public get columnName(): string {
    return `${this.name}_${this.config.type === 'toOne' ? 'id' : 'ids'}`;
  }

  public get fetchField(): string {
    let name = this.name;
    const searchFields = getThunkValue(this.config.targetEntity)
      .searchableFields;
    name += `{ id ${searchFields.map(f => f.name).join(' ')}} ${
      this.columnName
    } `;
    return name;
  }

  public get render(): ((record: T) => React.ReactNode) {
    const { targetEntity, type } = this.config;
    const render = getThunkValue(targetEntity).render;
    return values => {
      const value = values[this.name];
      if (type === 'toMany' && Array.isArray(value)) {
        return value
          .map(x => render && render(x))
          .filter(x => x)
          .join(', ');
      }
      return render && render(value);
    };
  }

  public fieldElement(
    field: EntityField<T, any>,
    formContext: FormContext,
    key: string | number
  ): React.ReactNode {
    const { targetEntity, mode } = this.config;
    return (
      <ResourceCollectionLayer
        key={key}
        name={targetEntity.name}
        fields={['id', ...targetEntity.searchableFields.map(x => x.name)]}
        dataSource={targetEntity.dataSource}
        render={(collection: ResourceCollection) => {
          return (
            <FormField
              label={this.title}
              name={this.columnName}
              formContext={formContext}
            >
              <ResourceSelect
                valueKey="id"
                labelKey={(value: any): string => {
                  return targetEntity.render(value);
                }}
                mode={mode}
                resourceCollection={collection}
              />
            </FormField>
          );
        }}
      />
    );
  }

  public inputElement(props?: {
    value?: any;
    onChange?: (value: any) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    const { targetEntity, mode } = this.config;
    return (
      <ResourceCollectionLayer
        name={targetEntity.name}
        fields={['id', ...targetEntity.searchableFields.map(x => x.fetchField)]}
        dataSource={targetEntity.dataSource}
        render={(collection: ResourceCollection) => {
          return (
            <ResourceSelect
              {...props}
              valueKey="id"
              labelKey={(value: any): string => {
                return targetEntity.render(value);
              }}
              mode={mode}
              resourceCollection={collection}
            />
          );
        }}
      />
    );
  }
}
