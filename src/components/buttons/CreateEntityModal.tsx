import * as React from "react";

import { Entity } from "../../model/Entity";
import { FormInstance } from "webpanel-antd";
import { IEntityFormProps } from "../form/entity-form";
import Modal from "antd/lib/modal/Modal";
import { ModalProps } from "antd/lib/modal";
import { useTranslation } from "react-i18next";

export interface CreateEntityModalProps extends IEntityFormProps {
  entity: Entity;
  modal?: ModalProps;
}
export const CreateEntityModal = (props: CreateEntityModalProps) => {
  const { t } = useTranslation();
  // const [modalVisible, setModalVisible] = React.useState(false);
  const formRef = React.useRef<FormInstance | null>(null);

  const { entity, modal, ...rest } = props;

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

  return (
    <Modal
      // visible={modalVisible}
      onOk={() => formRef?.current?.submit()}
      // onCancel={() => setModalVisible(false)}
      title={getTitle()}
      destroyOnClose={true}
      {...modal}
    >
      {entity.getCreateView({
        wrapperType: "plain",
        formRef: formRef,
        ...rest,
      })}
    </Modal>
  );
};
