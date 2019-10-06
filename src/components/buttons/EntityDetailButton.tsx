import * as React from 'react';

import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { Entity } from '../../model/Entity';
import { IEntityDetailConfig } from '../pages/detail';
import { Link } from 'webpanel-antd';
import { ModalProps } from 'antd/lib/modal';
import { ResourceID } from 'webpanel-data';
import { Translation } from 'react-i18next';

export interface IEntityDetailButtonModalFlow {
  type: 'modal';
  modal?: ModalProps;
}
type FlowType = 'redirect' | IEntityDetailButtonModalFlow;

export interface DetailEntityProps extends IEntityDetailConfig {
  flow?: FlowType;
  key?: string;
  button?: ButtonProps;
}

export interface DetailEntityButtonProps extends DetailEntityProps {
  entity: Entity;
  entityId: ResourceID;
}
export class DetailEntityButton extends React.Component<
  DetailEntityButtonProps,
  { showModal: boolean }
> {
  public state = { showModal: false };

  public render() {
    const { entity, entityId, flow, key, button, modal, ...rest } = this.props;

    let _flow = flow || 'redirect';

    if (_flow === 'redirect') {
      return (
        <Link to={entity.getDetailLink(entityId)} key={key}>
          <Button htmlType="button" icon="search" {...button} />
        </Link>
      );
    }

    if (_flow.type === 'modal') {
      const modal = _flow.modal;
      return (
        <Translation key={key}>
          {t => (
            <>
              <div style={{ position: 'absolute' }}>
                {entity.getDetailView(entityId, {
                  wrapperType: 'modal',
                  modal: {
                    title: t(`${entity.name}._title`, {
                      defaultValue: `${entity.title}`
                    }),
                    onCancel: this.hideModal,
                    footer: entity.getDetailButton(entityId, {
                      flow: 'redirect',
                      button: { icon: 'select' }
                    }),
                    ...modal,
                    visible: this.state.showModal,
                    destroyOnClose: true
                  },
                  ...rest
                })}
              </div>
              <Button icon="search" {...button} onClick={this.showModal} />
            </>
          )}
        </Translation>
      );
    }
    return `unexpected flow`;
  }

  private showModal = () => {
    this.setState({ showModal: true });
  };
  private hideModal = () => {
    this.setState({ showModal: false });
  };
}
