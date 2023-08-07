import "./_fileUploaderWThumbnail.scss";
import { FileUploader } from "@carbon/react";
import { FileUploaderProps } from "carbon-components-react";
import { MouseEvent, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import thumb from "./assets/thumbnail-place-holder.jpg";

type Props = Omit<FileUploaderProps, "multiple"> & {
  thumbnailPlaceholderURL?: string;
  existingFileThumbnail?: string;
};

export default function FileUploaderWThumbnail({
  thumbnailPlaceholderURL,
  existingFileThumbnail,
  ...Props
}: Props) {
  const fileUploaderRef = useRef<HTMLDivElement>(null);
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(
    null
  );

  const emptyThumbnailURL = thumbnailPlaceholderURL
    ? thumbnailPlaceholderURL
    : thumb;
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(emptyThumbnailURL);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setThumbnailUrl(fileUrl);
      console.log("the selected file changed", file);
    }
    Props.onChange && Props.onChange(event);
  };

  function handleDelete(e: MouseEvent<HTMLElement, globalThis.MouseEvent>) {
    Props.onDelete && Props.onDelete(e);
    fileInputRef!.value = "";
    console.log("the selected file deleted");
    console.log("the selected files are empty: ", fileInputRef!.files);
    setThumbnailUrl(emptyThumbnailURL);
  }

  useEffect(() => {
    if (fileUploaderRef.current) {
      const fileInput: HTMLInputElement | null =
        fileUploaderRef.current.querySelector("input.cds--visually-hidden");
      if (fileInput && !fileInputRef) setFileInputRef(fileInput);

      addCustomDeleteButton();
    }
    fileInputRef?.files && console.log(fileInputRef?.files[0]);
  }, [fileUploaderRef.current]);

  useEffect(() => {
    if (fileInputRef) {
      fileInputRef.onchange = (e: Event) => {
        const event: React.ChangeEvent<HTMLInputElement> =
          e as unknown as React.ChangeEvent<HTMLInputElement>;
        handleFileChange(event);
      };
    }
  }, [fileInputRef]);

  useEffect(() => {
    fileUploaderRef.current &&
      fileUploaderRef.current.style.setProperty(
        "--thumbnail-url",
        `url(${thumbnailUrl})`
      );
  }, [thumbnailUrl]);

  return (
    <div id="file-uploader-w-thumbnails" ref={fileUploaderRef}>
      <FileUploader
        {...Props}
        multiple={false}
        onChange={(c) => {
          true;
        }}
        onDelete={(e) => {
          handleDelete(e);
        }}
      />
    </div>
  );

  function addCustomDeleteButton() {
    const fileContainer: HTMLInputElement | null =
      fileUploaderRef.current.querySelector(".cds--file-container");
    if (fileContainer) {
      console.log(fileContainer);

      const jsx = (
        <span className="cds--file__selected-file cds--file__selected-file--md">
          <span className="cds--file__state-container">
            <button className="cds--file-close" type="button"></button>
          </span>
        </span>
      );

      // @ts-ignore
      const root = ReactDOM.createRoot(fileContainer);
      root.render(jsx);
    }
  }
}
