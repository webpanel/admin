import { Card, Icon, Button } from 'antd';
import * as React from 'react';
// import { Link } from 'react-router-dom';
import { ResourceSearchInput, ResourceTable, Link } from 'webpanel-antd';
import {
  DataSource,
  ResourceCollection,
  ResourceCollectionLayer
} from 'webpanel-data';

import { Entity } from '../../model/Entity';
import { ColumnProps } from 'antd/lib/table';
import { ActionButtonProps } from 'webpanel-antd/lib/table/ResourceTableActionButtons';

export interface IEntityListTableProps {
  condensed?: boolean;
}

export interface IEntityListProps {
  entity: Entity<any>;
  dataSource: DataSource;
  table?: IEntityListTableProps;
}

export class EntityList extends React.Component<IEntityListProps> {
  public render() {
    const { entity, table } = this.props;

    return (
      <ResourceCollectionLayer
        name={entity.name}
        dataSource={this.props.dataSource}
        fields={['id', ...entity.listFields.map(x => x.fetchField)]}
        initialSorting={entity.initialSorting}
        initialFilters={entity.initialFilters}
        render={(resource: ResourceCollection) => (
          <Card
            bodyStyle={{ padding: '0' }}
            title={
              <div>
                {entity.title}{' '}
                <Link to="new">
                  <Button size="small" htmlType="button" icon="plus" />
                </Link>
              </div>
            }
            extra={
              entity.searchable && (
                <ResourceSearchInput
                  resourceCollection={resource}
                  size="small"
                />
              )
            }
          >
            <ResourceTable
              className="entitytable"
              scroll={{ x: true }}
              resourceCollection={resource}
              pagination={{pageSize:30}}
              {...table}
              columns={entity.listFields.map(
                (field): ColumnProps<any> => {
                  const { render, filter } = field;
                  return {
                    key: field.name,
                    dataIndex: field.name,
                    title: field.shortTitle,
                    sorter: field.sortable,

                    filterDropdown: filter ? field.filterDropdown(resource) : undefined,
                    // onFilter: filter ? field.onFilter : undefined,

                    render: (value: any, record: any): React.ReactNode => {
                      return render(record);
                    }
                  };
                }
              )}
              actionButtons={[
                (props: ActionButtonProps) => (
                  <Link
                    key="detail-button-action"
                    to={`${props.resourceID.toString()}`}
                  >
                    <Button size="small">
                      <Icon type={entity.showDetailPage ? 'search' : 'edit'} />
                    </Button>
                  </Link>
                ),
                entity.showDetailPage
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
                'delete'
              ].filter(x => x)}
            />
          </Card>
        )}
      />
    );
  }
}
