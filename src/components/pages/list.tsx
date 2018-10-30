import { Card, Icon } from 'antd';
import * as React from 'react';
// import { Link } from 'react-router-dom';
import { ResourceTable } from 'webpanel-antd';
import {
  DataSource,
  ResourceCollection,
  ResourceCollectionLayer
} from 'webpanel-data';

import { Entity } from '../../model/Entity';

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
          <Card bodyStyle={{ padding: '0' }}>
            <ResourceTable
              className="entitytable"
              scroll={{ x: true }}
              resourceCollection={resource}
              {...table}
              columns={entity.listFields.map((field, i) => {
                const { render } = field;
                return {
                  key: i,
                  dataIndex: field.name,
                  title: field.title,
                  sorter: field.sortable,
                  render: (value: any, record: any): React.ReactNode => {
                    return render(record);
                  }
                };
              })}
              detailButtonText={
                entity.showDetailPage ? undefined : <Icon type="edit" />
              }
            />
          </Card>
        )}
      />
    );
  }
}
