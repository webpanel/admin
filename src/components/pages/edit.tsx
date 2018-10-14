import { Card } from 'antd';
import * as React from 'react';
import { ResourceForm, ResourceFormButtons } from 'webpanel-antd';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { Resource, ResourceLayer } from 'webpanel-data';

import { Entity } from '../../model/Entity';

export interface IEntityEditProps {
  entity: Entity<any>;
  resourceID?: string;
  onCreate?: (id: string) => void;
}

export class EntityEdit extends React.Component<IEntityEditProps> {
  public render() {
    const { entity, resourceID, onCreate } = this.props;
    return (
      <ResourceLayer
        name={entity.name}
        id={resourceID}
        fields={entity.editFields.map(f => f.columnName)}
        dataSource={entity.dataSource}
        onCreate={onCreate}
        render={(resource: Resource) => (
          <Card>
            <ResourceForm
              formResource={resource}
              render={(formContext: FormContext) => (
                <>
                  {entity.editFields.map((field, i) =>
                    field.fieldElement(field, formContext, i)
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
