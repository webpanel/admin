import * as React from "react";
import * as numeral from "numeral";

import { Button, Upload, message } from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Thunk, resolveOptionalThunk } from "ts-thunk";

import { Entity } from "../../model/Entity";
import { ResourceLayer } from "webpanel-data";
import { UploadFile } from "antd/lib/upload/interface";
import { UploadRequest } from "./upload-request";

interface IFile {
  id: string;
  ID: string;
  name?: string;
  size?: number;
  url?: string;
  contentType?: string;
}
interface IFileInputProps {
  entity: Entity;
  uploadURL?: string;
  hostURL?: string;
  value?: string;
  onChange?: (newValue: string | null) => void;
  accessToken?: Thunk<Promise<string>>;
}
interface IFileInputState {
  value: string | null;
  accessToken?: string;
}

export class FileInput extends React.Component<
  IFileInputProps,
  IFileInputState
> {
  static getDerivedStateFromProps(props: IFileInputProps) {
    let state: IFileInputState = { value: null };
    if ("value" in props) {
      state.value = props.value || null;
    }
    return state;
  }

  constructor(props: IFileInputProps) {
    super(props);
    this.state = { value: props.value || null };
  }

  componentDidMount() {
    const { accessToken } = this.props;
    const loadToken = async () => {
      const token = await resolveOptionalThunk(accessToken);
      if (token) {
        this.setState({ accessToken: token });
      }
    };
    loadToken();
  }

  fileChangeHandler(file: UploadFile) {
    if (file.status === "done") {
      this.udpateValue(file.response);
    }
  }

  udpateValue(file: IFile | null) {
    this.setState({ value: file && (file.id || file.ID) });
    if (this.props.onChange) {
      this.props.onChange((file && (file.id || file.ID)) || null);
    }
  }

  openItem = async (hostURL: string, id: string, token?: string) => {
    try {
      // setLoading(true);
      const url = await fetch(`${hostURL}/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((json) => json.url);
      window.open(url, "_blank");
    } catch (err) {
      message.error(err.message);
    } finally {
      // setLoading(false);
    }
  };

  renderFile(): React.ReactNode {
    const { value, accessToken } = this.state;
    const { entity, hostURL } = this.props;

    if (!value) {
      return null;
    }

    return (
      <ResourceLayer
        name="File"
        id={value}
        dataSource={entity.dataSource}
        fields={["name", "size"]}
        render={({ data }) =>
          (data && (
            <Button
              size="small"
              onClick={() =>
                hostURL && this.openItem(hostURL, value, accessToken)
              }
            >
              {data.name} ({numeral(data.size).format("0.0 b")})
            </Button>
          )) ||
          null
        }
      />
    );
  }

  clearValue() {
    this.setState({ value: null });
  }

  render(): React.ReactNode {
    const { value, accessToken } = this.state;
    const { uploadURL: fileUploadURL } = this.props;

    const headers: { [key: string]: string } = {};
    if (accessToken) {
      headers.authorization = `Bearer ${accessToken}`;
    }

    return value ? (
      <>
        {this.renderFile()}
        <Button
          icon={<CloseOutlined />}
          onClick={() => this.udpateValue(null)}
          size="small"
        />
      </>
    ) : (
      <Upload
        action={fileUploadURL}
        onChange={({ file }) => this.fileChangeHandler(file)}
        headers={headers}
        customRequest={UploadRequest}
      >
        <Button>
          <UploadOutlined /> Upload
        </Button>
      </Upload>
    );
  }
}
