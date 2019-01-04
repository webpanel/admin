import * as React from 'react';
import { ResourceCollectionLayer, ResourceCollection } from 'webpanel-data';
import { resolveThunk, Thunk } from 'ts-thunk';

import {
  EntityField,
  IEntityFieldConfig,
  IEntityFieldFilterProps
} from '../EntityField';
import { Entity } from '../Entity';
import { FormField, ResourceSelect } from 'webpanel-antd';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { Button, Modal, Tag } from 'antd';
import { EntityEdit } from '../../components/pages/edit';
import { FormLayout } from 'antd/lib/form/Form';
import { entityPermission } from '../permissions';

export type IEntityFieldRelationshipType = 'toOne' | 'toMany';
export type IEntityFieldRelationshipSelectMode = 'default' | 'multiple';

export interface IEntityFieldRelationshipConfig<T>
  extends IEntityFieldConfig<T> {
  targetEntity: Thunk<Entity<any>>;
  type: IEntityFieldRelationshipType;
}

export class EntityFieldRelationship<T> extends EntityField<
  T,
  IEntityFieldRelationshipConfig<T>
> {
  public get type(): IEntityFieldRelationshipType {
    return this.config.type === 'toOne' ? 'toOne' : 'toMany';
  }

  public columnName(): string {
    return `${this.name}${this.type === 'toOne' ? 'Id' : 'Ids'}`;
  }

  public get mode(): IEntityFieldRelationshipSelectMode {
    return this.type === 'toOne' ? 'default' : 'multiple';
  }

  public fetchField(): string | null {
    let name = this.name;

    const searchFields = resolveThunk(this.config.targetEntity)
      .searchableFields;
    name += `{ id ${searchFields
      .map(f => f.name)
      .join(' ')}} ${this.columnName()} `;
    return name;
  }

  public get render(): ((record: T) => React.ReactNode) {
    const { targetEntity, type } = this.config;
    const render = resolveThunk(targetEntity).render;
    return values => {
      const value = values[this.name];
      if (type === 'toMany' && Array.isArray(value)) {
        return value
          .map(x => render && render(x))
          .filter(x => x)
          .map(x => <Tag key={x}>{x}</Tag>);
      }
      return render && render(value);
    };
  }

  public fieldElement(
    formContext: FormContext,
    key: string | number,
    config: { formLayout?: FormLayout }
  ): React.ReactNode {
    const { targetEntity } = this.config;
    const _targetEntity = resolveThunk(targetEntity);

    const formItemLayout =
      config.formLayout === 'horizontal'
        ? {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 }
          }
        : null;

    const addButtonMargin =
      config.formLayout === 'horizontal' ? '4px 0 0 4px' : '43px 0 0 4px';

    return (
      <ResourceCollectionLayer
        key={key}
        name={_targetEntity.name}
        fields={[
          'id',
          ..._targetEntity.searchableFields.map(
            (x: EntityField<any, any>) => x.name
          )
        ]}
        initialSorting={_targetEntity.initialSorting}
        initialFilters={_targetEntity.initialFilters}
        dataSource={_targetEntity.dataSource}
        render={(collection: ResourceCollection) => (
          <FormField
            label={this.title}
            name={this.columnName()}
            formContext={formContext}
            style={{
              width: '100%'
            }}
            {...formItemLayout}
          >
            <ResourceSelect
              valueKey="id"
              labelKey={(value: any): string => {
                return _targetEntity.render(value);
              }}
              mode={this.mode}
              resourceCollection={collection}
              style={{
                width: '100%',
                minWidth: '200px',
                marginRight: '-38px',
                paddingRight: '38px'
              }}
            />
            {entityPermission(_targetEntity, 'create') && (
              <Button
                size="small"
                icon="plus"
                style={{
                  margin: addButtonMargin,
                  height: '32px'
                }}
                onClick={() => {
                  const infoWindow = Modal.info({
                    title: `Add ${_targetEntity.title}`,
                    maskClosable: true,
                    okText: 'Close',
                    style: { minWidth: '60%' },
                    content: (
                      <EntityEdit
                        onCreate={async (id: string) => {
                          await collection.get();
                          let updateValues = {};
                          updateValues[this.columnName()] = id;
                          formContext.form.setFieldsValue(updateValues);
                          infoWindow.destroy();
                        }}
                        entity={_targetEntity}
                      />
                    )
                  });
                }}
              />
            )}
          </FormField>
        )}
      />
    );
  }

  public inputElement(props?: {
    value?: any;
    onChange?: (value: any, valueElement: React.ReactNode) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    const { targetEntity } = this.config;
    const _targetEntity = resolveThunk(targetEntity);

    const onChange = props && props.onChange;
    const onChangeProp = onChange
      ? (
          value: any,
          option: React.ReactElement<any> | React.ReactElement<any>[]
        ) => {
          const options: React.ReactElement<any>[] = Array.isArray(option)
            ? option
            : [option];
          // const array: LabeledValue[] = Array.isArray(value) ? value : [value];
          onChange(value, options.map(o => o.props.children).join(', '));
        }
      : undefined;

    return (
      <ResourceCollectionLayer
        name={_targetEntity.name}
        fields={[
          'id',
          ..._targetEntity.searchableFields.map(
            (x: EntityField<any, any>) => x.name
          )
        ]}
        initialSorting={_targetEntity.initialSorting}
        initialFilters={_targetEntity.initialFilters}
        dataSource={_targetEntity.dataSource}
        render={(collection: ResourceCollection) => {
          return (
            <ResourceSelect
              {...props}
              valueKey="id"
              allowClear={true}
              style={{ width: '100%', minWidth: '200px' }}
              labelKey={(value: any): string => {
                return _targetEntity.render(value);
              }}
              mode={this.mode}
              resourceCollection={collection}
              // labelInValue={true}
              onChange={onChangeProp}
            />
          );
        }}
      />
    );
  }

  public filterDropdownInput = (props: IEntityFieldFilterProps<string>) => {
    const { targetEntity } = this.config;
    const _targetEntity = resolveThunk(targetEntity);

    return (
      <ResourceCollectionLayer
        name={targetEntity.name}
        fields={[
          'id',
          ...(_targetEntity.searchableFields
            .map(x => x.fetchField())
            .filter(x => x) as string[])
        ]}
        dataSource={_targetEntity.dataSource}
        initialFilters={_targetEntity.initialFilters}
        initialSorting={_targetEntity.initialSorting}
        render={(resource: ResourceCollection) => {
          const value = props.selectedKeys;
          return (
            <ResourceSelect
              valueKey="id"
              labelKey={(value: any): string => {
                return _targetEntity.render(value);
              }}
              value={value}
              mode={this.mode}
              allowClear={false}
              resourceCollection={resource}
              style={{ minWidth: '200px' }}
              onChange={(
                value: string | string[],
                option: React.ReactElement<any> | React.ReactElement<any>[]
              ) => {
                if (Array.isArray(value)) {
                  props.setSelectedKeys(value);
                } else {
                  props.setSelectedKeys([value.toString()]);
                }
              }}
            />
          );
        }}
      />
    );
  };

  public get filterFormatter(): ((values: string[]) => { [key: string]: any }) {
    return (values: string[]) => {
      let res = {};
      if (values.length == 1) {
        res[this.name] = { id: values[0] };
      } else if (values.length > 1) {
        res[this.name] = { id_in: values };
      }
      return res;
    };
  }
}
