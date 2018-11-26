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
import { ActionButtonProps } from 'webpanel-antd/lib/table/ResourceTableActionButtons';
import { ResourceTableColumn } from 'webpanel-antd/lib/table/ResourceTable';

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
              pagination={{
                defaultPageSize: 30,
                pageSizeOptions: ['10', '20', '30', '50', '100'],
                showSizeChanger: true
              }}
              {...table}
              columns={entity.listFields.map(
                (field): ResourceTableColumn => {
                  const { render, filter } = field;
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
