import * as React from "react";

import { FormInstance, Link } from "webpanel-antd";

import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";
import { Entity } from "../../model/Entity";
import { IEntityFormProps } from "../form/entity-form";
import Modal from "antd/lib/modal/Modal";
import { ModalProps } from "antd/lib/modal";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export interface IEntityAddButtonModalFlow {
  type: "modal";
  modal?: ModalProps;
}
type FlowType = "redirect" | IEntityAddButtonModalFlow;
export interface CreateEntityProps extends IEntityFormProps {
  flow?: FlowType;
  key?: string;
  button?: ButtonProps;
}

export interface CreateEntityButtonProps extends CreateEntityProps {
  entity: Entity;
}
export const CreateEntityButton = (props: CreateEntityButtonProps) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const formRef = React.useRef<FormInstance | null>(null);
  // const [formInstance, setFormInstance] = React.useState<
  //   FormInstance | undefined
  // >(undefined);

  const { entity, initialValues, fields, flow, onSave, button } = props;

  let _flow = flow || "redirect";

  if (_flow === "redirect") {
    return (
      <Link to={entity.getCreateLink()} key="newButton">
        <Button htmlType="button" icon={<PlusOutlined />} {...button} />
      </Link>
    );
  }

  const hideModal = () => {
    setModalVisible(false);
  };

  const getTitle = (): string => {
    return (
      t(`${entity.name}._title`, {
        defaultValue: entity.title,
      }) +
      ": " +
      ((formRef.current && entity.render(formRef.current.getFieldsValue())) ||
        "-")
    );
  };

  if (_flow.type === "modal") {
    // const modal = _flow.modal;
    return (
      <>
        <Modal
          visible={modalVisible}
          onOk={() => formRef?.current?.submit()}
          onCancel={() => setModalVisible(false)}
          title={getTitle()}
          destroyOnClose={true}
        >
          {entity.getCreateView({
            initialValues,
            fields,
            wrapperType: "plain",
            formRef: formRef,
            onSave: (id) => {
              hideModal();
              if (onSave) {
                onSave(id);
              }
            },
          })}
        </Modal>
        <Button
          icon={<PlusOutlined />}
          {...button}
          onClick={() => setModalVisible(true)}
        />
      </>
    );
  }
  return <>unexpected flow</>;
};
