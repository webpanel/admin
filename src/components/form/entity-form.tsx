import * as React from "react";

import { Form, Spin, message } from "antd";
import { Resource, ResourceID, useResource } from "webpanel-data";
import { Thunk, resolveOptionalThunk } from "ts-thunk";

import { Entity } from "../../model/Entity";
import { EntityField } from "../../model/EntityField";
import { FormInstance } from "webpanel-antd";
import { FormLayout } from "antd/lib/form/Form";
import { PageNotFound } from "../pages/not-found";
import { ResourceFormPageButtons } from "./buttons";

export type EntityOnSaveHandler = (id: ResourceID) => void;

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
}

export interface IEntityFormProps extends IEntityFormConfig {
  entity: Entity;
  formRef?: React.MutableRefObject<FormInstance | null>;
  onSave?: EntityOnSaveHandler;
  onValuesChanged?: (values: any) => void;
  showButtons?: boolean;
}

export interface IEntityFormEditProps extends IEntityFormProps {
  resourceID: ResourceID;
}
export interface IEntityFormCreateProps extends IEntityFormProps {}

export const isEntityEditFormProps = (
  props: any
): props is IEntityFormEditProps => {
  return typeof props.resourceID !== "undefined";
};

export const EntityForm = (
  props: IEntityFormCreateProps | IEntityFormEditProps
) => {
  const { formRef, onSave, onValuesChanged, showButtons, form } = props;
  const [formInstance] = Form.useForm();
  const [saving, setSaving] = React.useState(false);

  if (formRef) {
    formRef.current = formInstance;
  }

  const handleFormSuccess = async (resource: Resource) => {
    message.success("Form saved!");
    if (onSave) {
      onSave(resource.id || 0);
    }
  };

  var resourceID: ResourceID | undefined = undefined;
  if (isEntityEditFormProps(props)) {
    resourceID = props.resourceID;
  }

  const { entity, initialValues, fields } = props;
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

  if (!resource.loading && resource.data === null) {
    return <PageNotFound />;
  }

  const content = entity.getCardLayout("edit", {
    entity,
    resource,
    formInstance: formInstance,
    id: resourceID,
    data: resource.data,
    fields,
  });

  return (
    <Form
      key={JSON.stringify(resource.data)}
      form={formInstance}
      onFinish={async (values) => {
        try {
          setSaving(true);
          await resource.save(values);
          handleFormSuccess(resource);
        } catch (err) {
          message.error(err.message);
        } finally {
          setSaving(false);
        }
      }}
      onValuesChange={onValuesChanged}
      layout={"vertical"}
      initialValues={resource.data}
      {...form}
    >
      <Spin spinning={(resource.loading && !resource.polling) || saving}>
        {content}
        {showButtons && (
          <ResourceFormPageButtons
            saving={saving}
            // submit={() => formRefLocal?.current?.submit()}
            reset={() => formInstance.resetFields()}
          />
        )}
      </Spin>
    </Form>
  );
};
