import * as React from "react";

import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";
import { Entity } from "../../model/Entity";
import { IEntityFormConfig } from "../form/entity-form";
import { Link } from "webpanel-antd";
import { ModalProps } from "antd/lib/modal";
import { ResourceID } from "webpanel-data";
import { Translation } from "react-i18next";

export interface IEntityAddButtonModalFlow {
  type: "modal";
  modal?: ModalProps;
}
type FlowType = "redirect" | IEntityAddButtonModalFlow;
export interface CreateEntityProps extends IEntityFormConfig {
  onCreate?: (id: ResourceID) => void;
  flow?: FlowType;
  key?: string;
  button?: ButtonProps;
}

export interface CreateEntityButtonProps extends CreateEntityProps {
  entity: Entity;
}
export class CreateEntityButton extends React.Component<
  CreateEntityButtonProps,
  { showModal: boolean }
> {
  public state = { showModal: false };

  public render() {
    const {
      entity,
      initialValues,
      fields,
      flow,
      onCreate,
      button,
    } = this.props;

    let _flow = flow || "redirect";

    if (_flow === "redirect") {
      return (
        <Link to={entity.getCreateLink()} key="newButton">
          <Button htmlType="button" icon="plus" {...button} />
        </Link>
      );
    }

    if (_flow.type === "modal") {
      const modal = _flow.modal;
      return (
        <Translation>
          {(t) => (
            <>
              <div style={{ position: "absolute" }}>
                {entity.getCreateView(
                  {
                    initialValues,
                    fields,
                    wrapperType: "modal",
                    modal: {
                      title: t(`${entity.name}.title.create`, {
                        defaultValue: `Create ${entity.title}`,
                      }),
                      ...modal,
                      visible: this.state.showModal,
                      destroyOnClose: true,
                    },
                  },
                  {
                    onCancel: this.hideModal,
                    onSave: (id) => {
                      this.hideModal();
                      if (onCreate) {
                        onCreate(id);
                      }
                    },
                  }
                )}
              </div>
              <Button
                icon="plus"
                {...button}
                onClick={() => this.setState({ showModal: true })}
              />
            </>
          )}
        </Translation>
      );
    }
    return `unexpected flow`;
  }

  private hideModal = () => {
    this.setState({ showModal: false });
  };
}
