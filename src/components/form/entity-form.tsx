import * as React from "react";

import { Form, Spin, message } from "antd";
import { Resource, ResourceID, useResource } from "webpanel-data";
import { Thunk, resolveOptionalThunk } from "ts-thunk";

import { Entity } from "../../model/Entity";
import { EntityField } from "../../model/EntityField";
import { FormInstance } from "webpanel-antd";
import { FormLayout } from "antd/lib/form/Form";
import { SaveOption } from "./buttons";

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
}

export interface IEntityFormProps extends IEntityFormConfig {
  entity: Entity;
  formRef?: React.MutableRefObject<FormInstance | null>;
  onSave?: EntityOnSaveHandler;
  onValuesChanged?: (values: any) => void;
}

export interface IEntityFormEditProps extends IEntityFormProps {
  resourceID: ResourceID;
}
export interface IEntityFormCreateProps extends IEntityFormProps {}

const isEditProps = (props: any): props is IEntityFormEditProps => {
  return typeof props.resourceID !== "undefined";
};

export const EntityForm = (
  props: IEntityFormCreateProps | IEntityFormEditProps
) => {
  const { formRef, onSave, onValuesChanged } = props;
  const [form] = Form.useForm();
  const [saving, setSaving] = React.useState(false);

  if (formRef) {
    formRef.current = form;
  }

  const handleFormSuccess = async (resource: Resource) => {
    message.success("Form saved!");
    if (onSave) {
      onSave(resource.id || 0);
    }
  };

  var resourceID: ResourceID | undefined = undefined;
  if (isEditProps(props)) {
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

  const content = entity.getCardLayout("edit", {
    entity,
    resource,
    formInstance: formRef?.current || undefined,
    id: resourceID,
    data: resource.data || {},
    fields,
  });

  if (resource.data) {
    form.setFieldsValue(resource.data);
  }

  return (
    <Form
      form={form}
      onFinish={async (values) => {
        try {
          setSaving(true);
          resource.save(values);
          handleFormSuccess(resource);
        } catch (err) {
          message.error(err.message);
        } finally {
          setSaving(false);
        }
      }}
      onValuesChange={onValuesChanged}
      layout={"vertical"}
      {...form}
    >
      <Spin spinning={(resource.loading && !resource.polling) || saving}>
        {content}
      </Spin>
    </Form>
  );
};
