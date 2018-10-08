import * as React from 'react';
import { AuthProps } from 'webpanel-auth/lib/Auth';
import { DummyAuthProps } from 'webpanel-auth/lib/DummyAuth';
import { Entity } from './model/Entity';
export { Entity } from './model/Entity';
export interface IAdminProps {
    auth?: (AuthProps | DummyAuthProps) & {
        type: 'dummy' | 'oauth';
    };
    entities: Entity<any>[];
}
export declare class Admin extends React.Component<IAdminProps> {
    static Entity: typeof Entity;
    render(): JSX.Element;
}
