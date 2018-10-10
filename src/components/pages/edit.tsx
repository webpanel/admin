import { Card } from 'antd';
import * as React from 'react';
import {
  ResourceForm,
  ResourceFormButtons,
  RouteComponentProps
} from 'webpanel-antd';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { Resource, ResourceLayer } from 'webpanel-data';

import { Entity } from '../../model/Entity';

export class EntityEdit extends React.Component<{
  entity: Entity<any>;
  route: RouteComponentProps<any>;
}> {
  public render() {
    const { entity, route } = this.props;
    return (
      <ResourceLayer
        name={entity.name}
        id={route.match.params.id}
        fields={entity.detailFields.map(f => f.name)}
        dataSource={entity.dataSource}
        onCreate={(id: string) => {
          route.history.push(id);
        }}
        render={(resource: Resource) => (
          <Card>
            <ResourceForm
              formResource={resource}
              render={(formContext: FormContext) => (
                <>
                  {entity.detailFields.map((field, i) =>
                    field.fieldElement(formContext, i)
                  )}
                  <ResourceFormButtons formContext={formContext} />
                </>
              )}
            />
          </Card>
        )}
      />
    );
  }
}