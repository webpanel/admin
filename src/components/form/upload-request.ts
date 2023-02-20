import { RcFile } from "antd/lib/upload";
import type { UploadRequestOption } from "rc-upload/lib/interface";
class UploadError extends Error {
  public status: number;
  public url: string;
}

function getError(options: UploadRequestOption, xhr: XMLHttpRequest) {
  const msg = `cannot ${options.action} ${xhr.status}'`;
  const err = new UploadError(msg);
  err.status = xhr.status;
  err.url = options.action;
  return err;
}

function getBody(xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

// interface UploadOptions {
//   onProgress: (event: { percent: number }) => void;
//   onError: (event: UploadError, body?: Object) => void;
//   onSuccess: (body: Object, xhr: XMLHttpRequest) => void;
//   method: string;
//   data: Object;
//   filename: string;
//   file: File;
//   withCredentials: boolean;
//   action: string;
//   headers: Headers;
// }

const getFileObject = async (
  options: UploadRequestOption
): Promise<{ id: string; uploadURL: string }> => {
  return fetch(options.action, {
    method: "POST",
    body: JSON.stringify({
      filename: (options.file as RcFile).name,
      size: (options.file as RcFile).size,
      contentType: (options.file as RcFile).type,
    }),
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export function UploadRequest(options: UploadRequestOption) {
  const xhr = new XMLHttpRequest();
  var fileObject: { id: string; uploadURL: string };

  if (options.onProgress && xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      const event: { percent: number } = { ...e, percent: 0 };
      if (e.total > 0) {
        event.percent = (e.loaded / e.total) * 100;
      }
      if (options.onProgress) {
        options.onProgress(event);
      }
    };
  }

  xhr.onerror = function error(e) {
    if (options.onError) {
      options.onError(getError(options, xhr), getBody(xhr));
    }
  };

  xhr.onload = function onload() {
    // allow success when 2xx status
    // see https://github.com/react-component/upload/issues/34
    if (xhr.status < 200 || xhr.status >= 300) {
      return (
        options.onError && options.onError(getError(options, xhr), getBody(xhr))
      );
    }

    options.onSuccess && options.onSuccess(fileObject);
  };

  getFileObject(options).then((fo) => {
    fileObject = fo;
    xhr.open("PUT", fo.uploadURL, true);

    // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
    if (options.withCredentials && "withCredentials" in xhr) {
      xhr.withCredentials = true;
    }

    xhr.send(options.file);
  });
  return {
    abort() {
      xhr.abort();
    },
  };
}
