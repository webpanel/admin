import * as React from "react";

import { Card, Modal, Spin, message } from "antd";
import { Resource, ResourceID, ResourceLayer } from "webpanel-data";
import { ResourceFormPageButtons, SaveOption } from "../form/buttons";
import { Thunk, resolveOptionalThunk } from "ts-thunk";

import { Entity } from "../../model/Entity";
import { EntityField } from "../../model/EntityField";
import { FormContext } from "webpanel-antd/lib/form/form/Form";
import { FormLayout } from "antd/lib/form/Form";
import { ModalProps } from "antd/lib/modal";
import { ResourceForm } from "webpanel-antd";
import { Translation } from "react-i18next";

export type EntityOnSaveHandler = (id: ResourceID, option?: SaveOption) => void;

export interface IEntityEditFieldOptions {
  field: string | null;
}

export type IEntityEditConfigField = IEntityEditFieldOptions | string | null;

export interface IEntityEditFormProps {
  layout?: FormLayout;
}

export interface IEntityEditConfig {
  form?: IEntityEditFormProps;
  fields?: Thunk<IEntityEditConfigField[]>;
  initialValues?: { [key: string]: any };
  wrapperType?: "card" | "modal";
  modal?: ModalProps;
}

export interface IEntityEditProps extends IEntityEditConfig {
  entity: Entity;
  resourceID?: ResourceID;
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
    this.currentSaveOption = option;
    try {
      await formContext.formComponent.submit();
    } catch (err) {
      throw err;
    }

    this.currentSaveOption = undefined;
    this.setState({ version: this.state.version + 1 });
  };

  handleFormSuccess = async (resource: Resource) => {
    message.success("Form saved!");
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
    const { entity } = this.props;
    return (
      <Translation>
        {t => (
          <Card
            title={
              t(`${entity.name}._title`, {
                defaultValue: entity.title
              }) +
              ": " +
              ((resource.data && entity.render(resource.data)) || "-")
            }
          >
            <Spin spinning={resource.loading && !resource.polling}>
              {content}
              <ResourceFormPageButtons
                hasChanges={formContext.form.isFieldsTouched()}
                handleReset={() => formContext.formComponent.resetFields()}
                // handleSave={(option: SaveOption) =>
                //   this.handleSave(formContext, resource, option)
                // }
              />
            </Spin>
          </Card>
        )}
      </Translation>
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
        confirmLoading={resource.loading && !resource.polling}
        {...modal}
      >
        <Spin spinning={resource.loading && !resource.polling}>{content}</Spin>
      </Modal>
    );
  }

  public render(): React.ReactNode {
    const {
      entity,
      resourceID,
      onCreate,
      form,
      initialValues,
      wrapperType,
      fields
    } = this.props;
    let entityFields = entity
      .getEditFields(resourceID)
      .filter(f => f && f.fetchField() && f.writeable);
    const _fields = resolveOptionalThunk(fields);
    if (typeof _fields !== "undefined") {
      entityFields = _fields
        .map(f => {
          if (typeof f === "string") {
            return entity.getFieldOrFail(f);
          } else if (f === null || f.field === null) {
            return null;
          }
          return entity.getFieldOrFail(f.field);
        })
        .filter(x => x) as EntityField<any, any>[];
    }

    return (
      <ResourceLayer
        key={this.state.version}
        name={entity.name}
        id={resourceID}
        fields={
          entityFields
            .filter(f => f && f.fetchField() && f.writeable)
            .map(f => f.editFetchField())
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
              const content = entity.getLayout("edit", {
                entity,
                resource,
                formContext,
                id: resourceID,
                data: resource.data || {},
                fields
              });

              switch (wrapperType) {
                case "modal":
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
