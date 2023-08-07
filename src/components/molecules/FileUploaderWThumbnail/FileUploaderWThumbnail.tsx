import './_fileUploaderWThumbnail.scss';
import { FileUploader } from '@carbon/react';
import { FileUploaderProps } from 'carbon-components-react';
import {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom/client';
import thumb from './assets/thumbnail-place-holder.jpg';

type Props = Omit<FileUploaderProps, 'multiple'> & {
  thumbnailPlaceholderURL?: string;
  existingFileThumbnailUrl?: string;
  onDeleteUploaded?: (
    event?: MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => void;
};

export default function FileUploaderWThumbnail({
  thumbnailPlaceholderURL,
  existingFileThumbnailUrl,
  onDeleteUploaded,
  ...Props
}: Props) {
  const fileUploaderRef = useRef<HTMLDivElement>(null);
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(
    null
  );
  const fileContainerRoot = useRef<ReactDOM.Root>();

  const emptyThumbnailURL = thumbnailPlaceholderURL
    ? thumbnailPlaceholderURL
    : thumb;
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(emptyThumbnailURL);

  function removeTemporaryDeleteBtn() {
    const tempDelete: HTMLInputElement | null =
      fileUploaderRef.current!.querySelector('#temporary-delete-btn');
    if (tempDelete) {
      fileUploaderRef
        .current!.querySelector('.cds--file-container')!
        .removeChild(tempDelete);
    }
  }

  function addCustomDeleteButton() {
    if (!existingFileThumbnailUrl) return;
    setThumbnailUrl(existingFileThumbnailUrl);
    const fileContainer: HTMLInputElement | null =
      fileUploaderRef.current!.querySelector('.cds--file-container');
    if (fileContainer && !fileContainerRoot.current) {
      console.log(fileContainer);

      const jsx = (
        <span
          className="cds--file__selected-file cds--file__selected-file--md"
          id="temporary-delete-btn"
        >
          <span className="cds--file__state-container">
            <button
              className="cds--file-close"
              type="button"
              onClick={handleDeleteExisiting}
            ></button>
          </span>
        </span>
      );

      // @ts-ignore
      const root = ReactDOM.createRoot(fileContainer);
      root.render(jsx);
      fileContainerRoot.current = root;
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    removeTemporaryDeleteBtn();
    if (event.target.files?.length) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setThumbnailUrl(fileUrl);
      console.log('the selected file changed', file);
    }
    Props.onChange && Props.onChange(event);
  };

  function handleDelete(e: MouseEvent<HTMLElement, globalThis.MouseEvent>) {
    Props.onDelete && Props.onDelete(e);
    fileInputRef!.value = '';
    console.log('the selected file deleted');
    fileInputRef?.files &&
      console.log('the selected files are empty: ', fileInputRef.files);
    setThumbnailUrl(emptyThumbnailURL);
  }

  function handleDeleteExisiting(
    e: MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) {
    onDeleteUploaded && onDeleteUploaded(e);
    // fileInputRef!.value = '';
    removeTemporaryDeleteBtn();

    console.log('the existing file deleted');
    fileInputRef?.files &&
      console.log('the selected files are empty: ', fileInputRef.files);
    setThumbnailUrl(emptyThumbnailURL);
  }

  useEffect(() => {
    if (fileUploaderRef.current) {
      const fileInput: HTMLInputElement | null =
        fileUploaderRef.current.querySelector('input.cds--visually-hidden');
      if (fileInput && !fileInputRef) setFileInputRef(fileInput);

      if (!fileContainerRoot.current) {
        addCustomDeleteButton();
      }
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
        '--thumbnail-url',
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
}
