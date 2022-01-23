import * as React from "react";
import * as numeral from "numeral";

import { Button, Upload, message } from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Thunk, resolveOptionalThunk } from "ts-thunk";

import { UploadFile } from "antd/lib/upload/interface";
import { UploadRequest } from "./upload-request";
import { useResource } from "webpanel-data";
import { EntityBase } from "../../model/EntityBase";

interface IFile {
  id: string;
  ID: string;
  name?: string;
  size?: number;
  url?: string;
  contentType?: string;
}
interface IFileInputProps {
  entity: EntityBase;
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

const FileUploader = (
  props: IFileInputProps & {
    openItem: (hostURL: string, id: string, token?: string) => Promise<void>;
  }
) => {
  const { entity, hostURL, value, accessToken, openItem } = props;
  const resource = useResource({
    name: "File",
    id: value,
    dataSource: entity.dataSource,
    fields: ["name", "size"],
  });

  if (!value) {
    return null;
  }

  return (
    (resource.data && (
      <Button
        size="small"
        onClick={async () =>
          hostURL &&
          openItem(hostURL, value, await resolveOptionalThunk(accessToken))
        }
      >
        {resource.name} ({numeral(resource.data.size).format("0.0 b")})
      </Button>
    )) ||
    null
  );
};

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
        <FileUploader {...this.props} openItem={this.openItem} />
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
