import { Card } from 'antd';
import * as React from 'react';
import {
  FormField,
  ResourceForm,
  ResourceFormButtons,
  RouteComponentProps
} from 'webpanel-antd';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { DataSource, Resource, ResourceLayer } from 'webpanel-data';

import { Entity } from '../../model/Entity';

export class EntityDetail extends React.Component<{
  entity: Entity<any>;
  route: RouteComponentProps<any>;
  dataSource: DataSource;
}> {
  public render() {
    const { entity, route, dataSource } = this.props;
    return (
      <ResourceLayer
        name={entity.name}
        id={route.match.params.id}
        fields={entity.detailFields.map(f => f.name)}
        dataSource={dataSource}
        onCreate={(id: string) => {
          route.history.push(id);
        }}
        render={(resource: Resource) => (
          <Card>
            <ResourceForm
              formResource={resource}
              render={(formContext: FormContext) => (
                <>
                  {entity.detailFields.map((field, i) => (
                    <FormField
                      key={i}
                      label={field.title}
                      name={field.name}
                      formContext={formContext}
                    >
                      {field.inputElement()}
                    </FormField>
                  ))}
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
