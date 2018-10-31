import { Card } from 'antd';
import * as React from 'react';
import { ResourceForm, RouteComponentProps } from 'webpanel-antd';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { Resource, ResourceLayer } from 'webpanel-data';

import { Entity } from '../../model/Entity';
import { ResourceFormPageButtons, SaveOption } from '../form/buttons';

export interface IEntityEditProps {
  entity: Entity<any>;
  resourceID?: string;
  initialValues?: { [key: string]: any };
  route?: RouteComponentProps<any>;
  onCreate?: (id: string) => void;
}

export class EntityEdit extends React.Component<
  IEntityEditProps,
  { version: number }
> {
  state = { version: 0 };

  handleSave = async (
    formContext: FormContext,
    option: SaveOption,
    resource: Resource
  ) => {
    const { route, entity } = this.props;

    await formContext.formComponent.submit();

    if (!route) {
      return;
    }

    switch (option) {
      case 'add':
        this.setState({ version: this.state.version + 1 });
        break;
      case 'edit':
        route.history.push('/' + entity.structureName + '/' + resource.id);
        break;
      case 'default':
        route.history.push('/' + entity.structureName + '/');
        break;
    }
  };

  public render() {
    const { entity, resourceID, initialValues, onCreate } = this.props;
    return (
      <ResourceLayer
        key={this.state.version}
        name={entity.name}
        id={resourceID}
        fields={entity.editFields.map(f => f.columnName)}
        dataSource={entity.dataSource}
        onCreate={onCreate}
        initialValues={initialValues}
        render={(resource: Resource) => (
          <Card>
            <ResourceForm
              formResource={resource}
              render={(formContext: FormContext) => (
                <>
                  {entity.editFields.map((field, i) =>
                    field.fieldElement(field, formContext, i)
                  )}
                  <ResourceFormPageButtons
                    hasChanges={formContext.form.isFieldsTouched()}
                    handleReset={() => formContext.formComponent.resetFields()}
                    handleSave={(option: SaveOption) =>
                      this.handleSave(formContext, option, resource)
                    }
                  />
                </>
              )}
            />
          </Card>
        )}
      />
    );
  }
}
