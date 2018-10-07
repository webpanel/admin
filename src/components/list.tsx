import { Button, Card } from 'antd';
// import { startCase } from 'lodash';
// import * as moment from 'moment';
import * as inflection from 'inflection';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ResourceTable } from 'webpanel-antd';
import {
  DataSource,
  ResourceCollection,
  ResourceCollectionLayer,
  SortInfoOrder
} from 'webpanel-data';

import { Entity } from '../model/Entity';

export class EntityList extends React.Component<{
  entity: Entity;
  dataSource: DataSource;
}> {
  public render() {
    const { entity } = this.props;
    return (
      <ResourceCollectionLayer
        name={entity.name}
        dataSource={this.props.dataSource}
        fields={['id', ...entity.listFields.map(x => x.name)]}
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
              columns={entity.listFields.map((field, i) => ({
                key: i,
                dataIndex: field.name,
                title: inflection.transform(field.title || field.name, [
                  'underscore',
                  'titleize'
                ])
              }))}
              detailButtonText="Edit"
            />
          </Card>
        )}
      />
    );
  }
}
