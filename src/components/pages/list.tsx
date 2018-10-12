import { Button, Card } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ResourceTable } from 'webpanel-antd';
import {
  DataSource,
  ResourceCollection,
  ResourceCollectionLayer,
  SortInfoOrder
} from 'webpanel-data';

import { Entity } from '../../model/Entity';

export interface IEntityListProps {
  entity: Entity<any>;
  dataSource: DataSource;
  detailButtonText: string;
}

export class EntityList extends React.Component<IEntityListProps> {
  public render() {
    const { entity } = this.props;
    return (
      <ResourceCollectionLayer
        name={entity.name}
        dataSource={this.props.dataSource}
        fields={['id', ...entity.listFields.map(x => x.fetchField)]}
        initialSorting={[{ columnKey: 'id', order: SortInfoOrder.ascend }]}
        render={(resource: ResourceCollection) => (
          <Card
            title={entity.title}
            extra={
              <Link to="new">
                <Button htmlType="button">+</Button>
              </Link>
            }
          >
            <ResourceTable
              resourceCollection={resource}
              columns={entity.listFields.map((field, i) => {
                const { render } = field;
                return {
                  key: i,
                  dataIndex: field.name,
                  title: field.title,
                  render
                };
              })}
              detailButtonText={this.props.detailButtonText}
            />
          </Card>
        )}
      />
    );
  }
}
