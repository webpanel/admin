import * as React from 'react';

import { Button } from 'antd';
import { Entity } from '../../model/Entity';
import { Link } from 'webpanel-antd';
import { ModalProps } from 'antd/lib/modal';
import { Translation } from 'react-i18next';

export interface IEntityAddButtonModalFlow {
  type: 'modal';
  modal?: ModalProps;
}
type FlowType = 'redirect' | IEntityAddButtonModalFlow;
export interface IEntityAddButtonProps {
  initialValues?: { [key: string]: any };
  flow?: FlowType;
}

interface IEntityAddButtonComponentProps extends IEntityAddButtonProps {
  entity: Entity;
  // called only if flow='modal'
  onCreate?: () => void;
}
interface IEntityAddButtonState {
  showModal: boolean;
}

export class EntityAddButton extends React.Component<
  IEntityAddButtonComponentProps,
  IEntityAddButtonState
> {
  public state = { showModal: false };

  public render() {
    const { entity, initialValues, flow } = this.props;

    let _flow = flow || 'redirect';

    if (_flow === 'redirect') {
      return (
        <Link to={entity.getCreateLink()} key="newButton">
          <Button size="small" htmlType="button" icon="plus" />
        </Link>
      );
    }

    if (_flow.type === 'modal') {
      const modal = _flow.modal;
      return (
        <Translation>
          {t => (
            <>
              <div style={{ position: 'absolute' }}>
                {entity.getCreateView(
                  {
                    initialValues,
                    wrapperType: 'modal',
                    modal: {
                      title: t(`${entity.name}.title.create`, {
                        defaultValue: `Create ${entity.title}`
                      }),
                      ...modal,
                      visible: this.state.showModal,
                      destroyOnClose: true
                    }
                  },
                  {
                    onCancel: this.hideModal,
                    onSave: () => {
                      this.hideModal();
                      const fn = this.props.onCreate;
                      if (fn) {
                        fn();
                      }
                    }
                  }
                )}
              </div>
              <Button
                size="small"
                icon="plus"
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
