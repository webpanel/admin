import * as React from 'react';
export declare const job: any;
export declare class CreateJobButton extends React.Component<{
    projectID: string | number;
    onCreate: () => void;
}, {
    showModal: boolean;
}> {
    state: {
        showModal: boolean;
    };
    render(): JSX.Element;
    private hideModal;
}
