import { Card, Icon, Button } from 'antd';
import * as React from 'react';
import { ResourceSearchInput, ResourceTable, Link } from 'webpanel-antd';
import {
  DataSource,
  ResourceCollection,
  ResourceCollectionLayer
} from 'webpanel-data';

import { Entity } from '../../model/Entity';
import { ActionButtonProps } from 'webpanel-antd/lib/table/ResourceTableActionButtons';
import { ResourceTableColumn } from 'webpanel-antd/lib/table/ResourceTable';
import { ListCell } from './list-cell';
import { entityPermission } from '../../model/permissions';
import { EntityField } from '../../model/EntityField';
import { Thunk, resolveOptionalThunk } from 'ts-thunk';

export interface IEntityListTableProps {
  condensed?: boolean;
}

export interface IEntityListConfig {
  table?: IEntityListTableProps;
  fields?: Thunk<string[]>;
  editableFields?: Thunk<string[]>;
}

export interface IEntityListProps extends IEntityListConfig {
  entity: Entity<any>;
  dataSource: DataSource;
}

export class EntityList extends React.Component<IEntityListProps> {
  public render() {
    const { entity, table, editableFields, fields } = this.props;

    const rowValues = {};

    const _editableFields =
      (entityPermission(entity, 'update') &&
        resolveOptionalThunk(editableFields)) ||
      [];
    const _fields = resolveOptionalThunk(fields) || [];
    const listFields: EntityField<any, any>[] =
      (_fields &&
        (_fields
          .map(f => entity.getField(f))
          .filter(x => x && x.visible('list', 'read')) as EntityField<
          any,
          any
        >[])) ||
      entity.listFields;

    return (
      <ResourceCollectionLayer
        name={entity.name}
        dataSource={this.props.dataSource}
        fields={[
          'id',
          ...(listFields.map(x => x.fetchField).filter(x => x) as string[])
        ]}
        initialSorting={entity.initialSorting}
        initialFilters={entity.initialFilters}
        render={(resource: ResourceCollection) => (
          <Card
            bodyStyle={{ padding: '0' }}
            title={entity.title}
            extra={[
              entity.searchable && (
                <ResourceSearchInput
                  key="searchInput"
                  resourceCollection={resource}
                  size="small"
                  style={{ width: 300, marginRight: 8 }}
                />
              ),
              entityPermission(entity, 'create') && (
                <Link to="new" key="newButton">
                  <Button size="small" htmlType="button" icon="plus" />
                </Link>
              )
            ].filter(x => x)}
          >
            <ResourceTable
              className="entitytable"
              scroll={{ x: true }}
              resourceCollection={resource}
              pagination={{
                defaultPageSize: 30,
                pageSizeOptions: ['10', '20', '30', '50', '100'],
                showSizeChanger: true
              }}
              {...table}
              columns={listFields.map(
                (field): ResourceTableColumn => {
                  const { filter } = field;
                  return {
                    key: field.name,
                    dataIndex: field.name,
                    title: field.shortTitle,
                    sorter: field.sortable,

                    filterDropdown: filter
                      ? field.filterDropdown(resource)
                      : undefined,
                    filterFormatter: field.filterFormatter,

                    render: (value: any, record: any): React.ReactNode => {
                      return (
                        <ListCell
                          collection={resource}
                          values={rowValues[record.id] || record}
                          field={field}
                          editable={_editableFields.indexOf(field.name) > -1}
                        />
                      );
                    }
                  };
                }
              )}
              actionButtons={[
                entity.showDetailPage || entityPermission(entity, 'update')
                  ? (props: ActionButtonProps) => (
                      <Link
                        key="detail-button-action"
                        to={`${props.resourceID.toString()}`}
                      >
                        <Button size="small">
                          <Icon
                            type={entity.showDetailPage ? 'search' : 'edit'}
                          />
                        </Button>
                      </Link>
                    )
                  : null,
                entity.showDetailPage && entityPermission(entity, 'update')
                  ? (props: ActionButtonProps) => (
                      <Link
                        key="edit-button-action"
                        to={`${props.resourceID.toString()}/edit`}
                      >
                        <Button size="small">
                          <Icon type="edit" />
                        </Button>
                      </Link>
                    )
                  : null,
                entityPermission(entity, 'delete') && 'delete'
              ].filter(x => x)}
            />
          </Card>
        )}
      />
    );
  }
}
