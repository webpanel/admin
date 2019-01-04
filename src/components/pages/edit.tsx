import { Card, message } from 'antd';
import * as React from 'react';
import { FormLayout } from 'antd/lib/form/Form';
import { ResourceForm, RouteComponentProps } from 'webpanel-antd';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { Resource, ResourceLayer } from 'webpanel-data';

import { Entity } from '../../model/Entity';
import { ResourceFormPageButtons, SaveOption } from '../form/buttons';

export interface IEntityEditFormProps {
  layout?: FormLayout;
}

export interface IEntityEditProps {
  entity: Entity<any>;
  resourceID?: string;
  initialValues?: { [key: string]: any };
  route?: RouteComponentProps<any>;
  onCreate?: (id: string) => void;
  form?: IEntityEditFormProps;
}

export class EntityEdit extends React.Component<
  IEntityEditProps,
  { version: number }
> {
  state = { version: 0 };

  private ignoreFormSuccessRedirect = false;

  handleSave = async (
    formContext: FormContext,
    option: SaveOption,
    resource: Resource
  ) => {
    const { route, entity } = this.props;

    this.ignoreFormSuccessRedirect = true;
    try {
      await formContext.formComponent.submit();
    } catch (err) {
      throw err;
    } finally {
      this.ignoreFormSuccessRedirect = false;
    }

    if (!route) {
      return;
    }

    switch (option) {
      case 'add':
        route.history.push('/' + entity.structureName + '/new');
        this.setState({ version: this.state.version + 1 });
        break;
      case 'edit':
        route.history.push('/' + entity.structureName + '/' + resource.id);
        break;
    }
  };

  handleFormSuccess = async (resource: Resource) => {
    message.success('Form saved!');

    if (this.ignoreFormSuccessRedirect) {
      return;
    }

    const { route, entity } = this.props;

    if (!route) {
      return;
    }

    if (entity.showDetailPage) {
      route.history.push('/' + entity.structureName + '/' + resource.id);
    } else {
      route.history.push('/' + entity.structureName + '/');
    }
  };

  public render() {
    const { entity, resourceID, initialValues, onCreate, form } = this.props;
    return (
      <ResourceLayer
        key={this.state.version}
        name={entity.name}
        id={resourceID}
        fields={
          entity.editFields.map(f => f.fetchField()).filter(f => f) as string[]
        }
        dataSource={entity.dataSource}
        onCreate={onCreate}
        initialValues={initialValues}
        render={(resource: Resource) => (
          <ResourceForm
            formResource={resource}
            onSuccess={(context: FormContext) =>
              this.handleFormSuccess(resource)
            }
            {...form}
            render={(formContext: FormContext) => {
              const layout = entity.getLayout('edit', {
                entity,
                formContext,
                id: resourceID,
                data: resource.data || {}
              });
              return (
                <Card>
                  <>
                    {layout ||
                      entity.editFields.map((field, i) =>
                        field.fieldElement(formContext, i, {
                          formLayout: form && form.layout
                        })
                      )}
                    <ResourceFormPageButtons
                      hasChanges={formContext.form.isFieldsTouched()}
                      handleReset={() =>
                        formContext.formComponent.resetFields()
                      }
                      handleSave={(option: SaveOption) =>
                        this.handleSave(formContext, option, resource)
                      }
                    />
                  </>
                </Card>
              );
            }}
          />
        )}
      />
    );
  }
}
