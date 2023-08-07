import './_fileUploaderWThumbnail.scss';
import useQuerySelector from '../../../hooks/useQuerySelector';
import { FileUploader } from '@carbon/react';
import { FileUploaderProps } from 'carbon-components-react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import thumb from './assets/thumbnail-place-holder.jpg';
import useJSXRenderer from '../../../hooks/useJSXRenderer';
import { removeChild } from '../../../utils/DomManipulationHelpers';

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
  const fileUploaderRef = useRef<HTMLDivElement | null>(null);
  const fileInput = useQuerySelector<HTMLInputElement>(
    fileUploaderRef,
    'input.cds--visually-hidden'
  );

  const fileContainer = useQuerySelector(
    fileUploaderRef,
    '.cds--file-container'
  );

  const fileContainerRoot = useRef<ReactDOM.Root>();

  const emptyThumbnailURL = thumbnailPlaceholderURL
    ? thumbnailPlaceholderURL
    : thumb;
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(emptyThumbnailURL);
  const [injectToFileContainer, removeFileContainerRoot] =
    useJSXRenderer(fileContainer);

  function removeTemporaryDeleteBtn() {
    removeFileContainerRoot();
    // removeChild(fileContainer, "#temporary-delete-btn")
  }

  function addCustomDeleteButton() {
    if (!existingFileThumbnailUrl) return;
    setThumbnailUrl(existingFileThumbnailUrl);
    injectToFileContainer(
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
    fileInput!.value = '';
    console.log('the selected file deleted');
    fileInput?.files &&
      console.log('the selected files are empty: ', fileInput.files);
    setThumbnailUrl(emptyThumbnailURL);
  }

  function handleDeleteExisiting(
    e: MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) {
    onDeleteUploaded && onDeleteUploaded(e);
    // fileInputRef!.value = '';
    removeTemporaryDeleteBtn();

    console.log('the existing file deleted');
    fileInput?.files &&
      console.log('the selected files are empty: ', fileInput.files);
    setThumbnailUrl(emptyThumbnailURL);
  }
  useEffect(() => {
    if (fileInput) {
      fileInput.onchange = (e: Event) => {
        const event: React.ChangeEvent<HTMLInputElement> =
          e as unknown as React.ChangeEvent<HTMLInputElement>;
        handleFileChange(event);
      };
    }
  }, [fileInput]);

  useEffect(() => {
    if (fileUploaderRef.current) {
      if (!fileContainerRoot.current) {
        addCustomDeleteButton();
      }
    }
    // fileInput?.files && console.log(fileInput?.files[0]);
  }, [fileUploaderRef.current]);

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
