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
        render={(resource: ResourceCollection) => (
          <Card
            bodyStyle={{ padding: '0' }}
            title={
              entity.searchable ? (
                <h1 style={{ fontSize: '20px' }}>{entity.title}</h1>
              ) : (
                undefined
              )
            }
            extra={
              entity.searchable ? (
                <ResourceSearchInput resourceCollection={resource} />
              ) : (
                undefined
              )
            }
          >
            <ResourceTable
              className="entitytable"
              scroll={{ x: true }}
              resourceCollection={resource}
              {...table}
              columns={entity.listFields.map(
                (field): ColumnProps<any> => {
                  const { render } = field;
                  return {
                    key: field.name,
                    dataIndex: field.name,
                    title: field.shortTitle,
                    sorter: field.sortable,
                    render: (value: any, record: any): React.ReactNode => {
                      return render(record);
                    }
                  };
                }
              )}
              actionButtons={[
                'detail',
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
