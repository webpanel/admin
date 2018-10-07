import { Card } from 'antd';
// import { startCase } from 'lodash';
import * as inflection from 'inflection';
import * as React from 'react';
import {
  FormField,
  Input,
  ResourceForm,
  ResourceFormButtons,
  RouteComponentProps
} from 'webpanel-antd';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { DataSource, Resource, ResourceLayer } from 'webpanel-data';

import { Entity } from '../model/Entity';

export class EntityDetail extends React.Component<{
  entity: Entity;
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
                      label={inflection.transform(field.title || field.name, [
                        'underscore',
                        'titleize'
                      ])}
                      name={field.name}
                      formContext={formContext}
                    >
                      <Input />
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
