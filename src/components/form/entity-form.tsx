import * as React from "react";

import { Resource, ResourceID, useResource } from "webpanel-data";
import { Spin, message } from "antd";
import { Thunk, resolveOptionalThunk } from "ts-thunk";

import { Entity } from "../../model/Entity";
import { EntityField } from "../../model/EntityField";
import { FormContext } from "webpanel-antd/lib/form/form/Form";
import { FormLayout } from "antd/lib/form/Form";
import { ModalProps } from "antd/lib/modal";
import { ResourceForm } from "webpanel-antd";
import { SaveOption } from "./buttons";

// import { Translation } from "react-i18next";

export type EntityOnSaveHandler = (id: ResourceID, option?: SaveOption) => void;

export interface IEntityFormFieldOptions {
  field: string | null;
}

export type IEntityFormConfigField = IEntityFormFieldOptions | string | null;

interface IEntityInternalFormProps {
  layout?: FormLayout;
}

export interface IEntityFormConfig {
  form?: IEntityInternalFormProps;
  fields?: Thunk<IEntityFormConfigField[]>;
  initialValues?: { [key: string]: any };
  modal?: ModalProps;
}

export interface IEntityFormProps extends IEntityFormConfig {
  entity: Entity;
  resourceID?: ResourceID;
  // route?: RouteComponentProps<any>;
  onSave?: EntityOnSaveHandler;
  // onCreate?: (id: string) => void;
  onCancel?: () => void;
  useFormContext?: (form: FormContext) => void;
}

export const EntityForm = (props: IEntityFormProps) => {
  const handleFormSuccess = async (resource: Resource) => {
    message.success("Form saved!");
    const { onSave } = props;

    if (onSave) {
      onSave(resource.id || 0, "add");
    }
  };

  const { entity, resourceID, form, initialValues, fields } = props;
  let entityFields = entity
    .getEditFields(resourceID)
    .filter((f) => f && f.fetchField() && f.writeable);
  const _fields = resolveOptionalThunk(fields);
  if (typeof _fields !== "undefined") {
    entityFields = _fields
      .map((f) => {
        if (typeof f === "string") {
          return entity.getFieldOrFail(f);
        } else if (f === null || f.field === null) {
          return null;
        }
        return entity.getFieldOrFail(f.field);
      })
      .filter((x) => x) as EntityField<any, any>[];
  }

  const resource = useResource({
    name: entity.name,
    id: resourceID,
    initialValues,
    fields: entityFields
      .filter((f) => f && f.fetchField() && f.writeable)
      .map((f) => f.editFetchField())
      .filter((f) => f) as string[],
    dataSource: entity.dataSource,
  });

  return (
    <ResourceForm
      formResource={resource}
      onSuccess={(context: FormContext) => handleFormSuccess(resource)}
      {...form}
      render={(formContext: FormContext) => {
        const content = entity.getLayout("edit", {
          entity,
          resource,
          formContext,
          id: resourceID,
          data: resource.data || {},
          fields,
        });

        return (
          <Spin spinning={resource.loading && !resource.polling}>
            {content}
            {/* <ResourceFormPageButtons
                  hasChanges={formContext.form.isFieldsTouched()}
                  handleReset={() => formContext.formComponent.resetFields()}
                /> */}
          </Spin>
        );
      }}
    />
  );
};
