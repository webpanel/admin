import * as React from "react";

import {
  EntityForm,
  IEntityFormConfig,
  IEntityFormCreateProps,
  IEntityFormEditProps,
} from "../form/entity-form";

import { Card } from "antd";
import { FormInstance } from "webpanel-antd";
// import { FormContext } from "webpanel-antd/lib/form/form/Form";
import { ResourceFormPageButtons } from "../form/buttons";
import { useTranslation } from "react-i18next";

export interface IEntityEditConfig extends IEntityFormConfig {
  wrapperType?: "card" | "plain";
}

export interface IEntityEditProps
  extends IEntityEditConfig,
    IEntityFormEditProps {}
export interface IEntityCreateProps
  extends IEntityEditConfig,
    IEntityFormCreateProps {}

export const EntityEdit = (
  props: (IEntityEditProps | IEntityCreateProps) & IEntityEditConfig
) => {
  const { t } = useTranslation();
  const [formInstance, setFormInstance] = React.useState<
    FormInstance | undefined
  >();
  const [formData, setFormData] = React.useState<any>(undefined);

  const { entity, wrapperType, formRef, ...restProps } = props;

  if (formRef && formInstance) {
    formRef(formInstance);
  }

  const submit = async () => {
    try {
      await formInstance?.submit();
    } catch (err) {
      throw err;
    }
  };

  const entityForm = (
    <EntityForm
      entity={entity}
      {...restProps}
      formRef={(form) => setFormInstance(form)}
      onValuesChanged={(values) => setFormData(values)}
    />
  );

  switch (wrapperType) {
    case "plain":
      return entityForm;
    default:
      return (
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
            submit={submit}
            reset={() => formInstance?.resetFields()}
          />
        </Card>
      );
  }
};
