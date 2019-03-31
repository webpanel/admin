import * as React from 'react';
import * as numeral from 'numeral';

import { Button, Icon, Upload } from 'antd';

import { AuthSession } from 'webpanel-auth';
import { Entity } from '../../model/Entity';
import { ResourceLayer } from 'webpanel-data';
import { UploadFile } from 'antd/lib/upload/interface';

interface IFile {
  id: string;
  name?: string;
  size?: number;
  url?: string;
  contentType?: string;
}
interface IFileInputProps {
  entity: Entity<any>;
  uploadURL?: string;
  value?: string;
  onChange?: (newValue: string | null) => void;
}
interface IFileInputState {
  value: string | null;
}

export class FileInput extends React.Component<
  IFileInputProps,
  IFileInputState
> {
  static getDerivedStateFromProps(props: IFileInputProps) {
    let state: IFileInputState = { value: null };
    if ('value' in props) {
      state.value = props.value || null;
    }
    return state;
  }

  constructor(props: IFileInputProps) {
    super(props);
    this.state = { value: props.value || null };
  }

  fileChangeHandler(file: UploadFile) {
    if (file.status === 'done') {
      this.udpateValue(file.response);
    }
  }

  udpateValue(file: IFile | null) {
    this.setState({ value: file && file.id });
    if (this.props.onChange) {
      this.props.onChange((file && file.id) || null);
    }
  }

  renderFile(): React.ReactNode {
    const { value } = this.state;
    const { entity } = this.props;
    if (!value) return null;
    return (
      <ResourceLayer
        name="File"
        id={value}
        dataSource={entity.dataSource}
        fields={['url', 'name', 'size']}
        render={({ data }) =>
          (data && (
            <a
              target="_blank"
              href={`${data.url}?access_token=${
                AuthSession.current().accessToken
              }`}
            >
              {data.name} ({numeral(data.size).format('0.0 b')})
            </a>
          )) ||
          null
        }
      />
    );
    // return value;
    // if (!file) {
    //   return null;
    // }
    // return (
    //   <a
    //     target="_blank"
    //     href={`${file.url}?access_token=${AuthSession.current().accessToken}`}
    //   >
    //     {file.name} ({numeral(file.size).format('0.0 b')})
    //   </a>
    // );
  }

  clearValue() {
    this.setState({ value: null });
  }

  render() {
    const { value } = this.state;
    const { uploadURL: fileUploadURL } = this.props;

    const accessToken = AuthSession.current().accessToken;
    const headers: { [key: string]: string } = {};
    if (accessToken) {
      headers.authorization = `Bearer ${accessToken}`;
    }

    return value ? (
      <>
        {this.renderFile()}
        <Button
          icon="cross"
          onClick={() => this.udpateValue(null)}
          size="small"
        />
      </>
    ) : (
      <Upload
        action={fileUploadURL}
        onChange={({ file }) => this.fileChangeHandler(file)}
        headers={headers}
      >
        <Button>
          <Icon type="upload" /> Upload
        </Button>
      </Upload>
    );
  }
}