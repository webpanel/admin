import * as React from 'react';

import { Card, Modal, message } from 'antd';
import { Resource, ResourceLayer } from 'webpanel-data';
import { ResourceFormPageButtons, SaveOption } from '../form/buttons';

import { Entity } from '../../model/Entity';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { FormLayout } from 'antd/lib/form/Form';
import { ModalProps } from 'antd/lib/modal';
import { ResourceForm } from 'webpanel-antd';

export type EntityOnSaveHandler = (
  id: string | number,
  option?: SaveOption
) => void;

export interface IEntityEditFormProps {
  layout?: FormLayout;
}

export interface IEntityEditConfig {
  form?: IEntityEditFormProps;
  initialValues?: { [key: string]: any };
  wrapperType?: 'card' | 'modal';
  modal?: ModalProps;
}

export interface IEntityEditProps extends IEntityEditConfig {
  entity: Entity<any>;
  resourceID?: string | number;
  // route?: RouteComponentProps<any>;
  onSave?: EntityOnSaveHandler;
  onCreate?: (id: string) => void;
  onCancel?: () => void;
}

export class EntityEdit extends React.Component<
  IEntityEditProps,
  { version: number }
> {
  state = { version: 0 };

  // private ignoreFormSuccessRedirect = false;
  private currentSaveOption?: SaveOption = undefined;

  handleSave = async (
    formContext: FormContext,
    resource: Resource,
    option?: SaveOption
  ) => {
    // this.ignoreFormSuccessRedirect = true;
    this.currentSaveOption = option;
    try {
      await formContext.formComponent.submit();
    } catch (err) {
      throw err;
      // } finally {
      // this.ignoreFormSuccessRedirect = false;
    }

    this.currentSaveOption = undefined;
    this.setState({ version: this.state.version + 1 });

    // if (!route) {
    //   return;
    // }

    // switch (option) {
    //   case 'add':
    //     route.history.push('/' + entity.structureName + '/new');
    //     this.setState({ version: this.state.version + 1 });
    //     break;
    //   case 'edit':
    //     route.history.push('/' + entity.structureName + '/' + resource.id);
    //     break;
    // }
  };

  handleFormSuccess = async (resource: Resource) => {
    message.success('Form saved!');
    const { onSave } = this.props;

    if (onSave) {
      onSave(resource.id || 0, this.currentSaveOption);
    }
  };

  private formCardContent(
    content: React.ReactNode,
    formContext: FormContext,
    resource: Resource
  ): React.ReactNode {
    return (
      <Card>
        <>
          {content}
          <ResourceFormPageButtons
            hasChanges={formContext.form.isFieldsTouched()}
            handleReset={() => formContext.formComponent.resetFields()}
            handleSave={(option: SaveOption) =>
              this.handleSave(formContext, resource, option)
            }
          />
        </>
      </Card>
    );
  }
  private formModalContent(
    content: React.ReactNode,
    formContext: FormContext,
    resource: Resource
  ): React.ReactNode {
    const { modal, onCancel } = this.props;
    return (
      <Modal
        onOk={() => this.handleSave(formContext, resource)}
        onCancel={onCancel}
        confirmLoading={resource.loading}
        {...modal}
      >
        {content}
      </Modal>
    );
  }

  public render() {
    const {
      entity,
      resourceID,
      onCreate,
      form,
      initialValues,
      wrapperType
    } = this.props;
    return (
      <ResourceLayer
        key={this.state.version}
        name={entity.name}
        id={resourceID}
        fields={
          entity.editFields
            .filter(f => f && f.fetchField())
            .map(f => f.columnName())
            .filter(f => f) as string[]
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
                resource,
                formContext,
                id: resourceID,
                data: resource.data || {}
              });
              const content =
                layout ||
                entity.editFields.map((field, i) =>
                  field.fieldElement(formContext, i, {
                    formLayout: form && form.layout
                  })
                );

              switch (wrapperType) {
                case 'modal':
                  return this.formModalContent(content, formContext, resource);
                default:
                  return this.formCardContent(content, formContext, resource);
              }
            }}
          />
        )}
      />
    );
  }
}
