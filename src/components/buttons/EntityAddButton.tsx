import * as React from "react";

import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";
import { CreateEntityModal } from "./CreateEntityModal";
import { Entity } from "../../model/Entity";
import { IEntityFormProps } from "../form/entity-form";
import { Link } from "webpanel-antd";
// import Modal from "antd/lib/modal/Modal";
import { ModalProps } from "antd/lib/modal";
import { PlusOutlined } from "@ant-design/icons";

// import { useTranslation } from "react-i18next";

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
  const { entity, flow, button, ...rest } = props;
  const [modalVisible, setModalVisible] = React.useState(false);

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

  if (_flow.type === "modal") {
    return (
      <>
        <CreateEntityModal
          entity={entity}
          modal={{
            onCancel: () => hideModal(),
            ..._flow.modal,
            visible: modalVisible,
          }}
          onSave={() => hideModal()}
          {...rest}
        />
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
