import "./_fileUploaderWThumbnail.scss";
import { FileUploader } from "@carbon/react";
import { FileUploaderProps } from "carbon-components-react";
import { useEffect, useState } from "react";
import thumb from "./assets/thumbnail-place-holder.jpg";

type Props = Omit<FileUploaderProps, "multiple"> & {
  thumbnailPlaceholderURL?: string;
};

export default function FileUploaderWThumbnail({
  thumbnailPlaceholderURL,
  ...Props
}: Props) {
  const emptyThumbnailURL = thumbnailPlaceholderURL
    ? thumbnailPlaceholderURL
    : thumb;

  const [thumbnailUrl, setThumbnailUrl] = useState<string>(emptyThumbnailURL);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setThumbnailUrl(fileUrl);
      // console.log(file);
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--thumbnail-url",
      `url(${thumbnailUrl})`
    );
  }, [thumbnailUrl]);

  return (
    <div className="file-uploader-w-thumbnails">
      <FileUploader
        {...Props}
        multiple={false}
        onChange={(c) => {
          handleFileChange(c);
          Props.onChange && Props.onChange(c);
        }}
        onDelete={(d) => {
          setThumbnailUrl(emptyThumbnailURL);
          // console.log("deleted file");
          Props.onDelete && Props.onDelete(d);
        }}
      />
    </div>
  );
}