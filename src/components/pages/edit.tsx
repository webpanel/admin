import * as React from "react";

import { Card, Modal } from "antd";
import {
  EntityForm,
  IEntityFormConfig,
  IEntityFormProps,
} from "../form/entity-form";

import { FormContext } from "webpanel-antd/lib/form/form/Form";
import { ModalProps } from "antd/lib/modal";
import { ResourceFormPageButtons } from "../form/buttons";
import { Translation } from "react-i18next";

export interface IEntityEditConfig extends IEntityFormConfig {
  wrapperType?: "card" | "plain" | "modal";
  modal?: ModalProps;
}

export interface IEntityEditProps extends IEntityEditConfig, IEntityFormProps {}

export const EntityEdit = (props: IEntityEditProps) => {
  const [formContext, setFormContext] = React.useState<
    FormContext | undefined
  >();

  const handleSave = async () => {
    try {
      await formContext?.formComponent.submit();
    } catch (err) {
      throw err;
    }
  };

  const {
    entity,
    resourceID,
    form,
    initialValues,
    wrapperType,
    fields,
    modal,
  } = props;

  const entityForm = (
    <EntityForm
      entity={entity}
      resourceID={resourceID}
      form={form}
      initialValues={initialValues}
      fields={fields}
      useFormContext={(context) => setFormContext(context)}
    />
  );

  switch (wrapperType) {
    case "modal":
      return (
        <Modal
          {...modal}
          onOk={async (e) => {
            await handleSave();
            if (modal?.onOk) {
              modal.onOk(e);
            }
          }}
        >
          {entityForm}
        </Modal>
      );
    case "plain":
      return entityForm;
    default:
      const formData = formContext?.form.getFieldsValue();
      return (
        <Translation>
          {(t) => (
            <Card
              title={
                t(`${entity.name}._title`, {
                  defaultValue: entity.title,
                }) +
                ": " +
                ((formData && entity.render(formData)) || "-")
              }
            >
              {entityForm}
              <ResourceFormPageButtons
                hasChanges={formContext?.form.isFieldsTouched() || false}
                handleReset={() => formContext?.formComponent.resetFields()}
              />
            </Card>
          )}
        </Translation>
      );
  }
};
