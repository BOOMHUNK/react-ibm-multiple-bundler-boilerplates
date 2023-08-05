import './_fileUploaderWThumbnail.scss';
import { FileUploader } from '@carbon/react';
import { FileUploaderProps } from 'carbon-components-react';
import { useEffect, useState } from 'react';

type Props = Omit<FileUploaderProps, 'multiple'> & {
  // extraProp1: string;
  // extraProp2: number;
};

export default function FileUploaderWThumbnail({ ...Props }: Props) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setThumbnailUrl(fileUrl);
    console.log(file);
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--thumbnail-url', '5484684684');
  }, [thumbnailUrl]);

  return (
    <div className="file-uploader-w-thumbnails">
      <FileUploader {...Props} multiple={false} onChange={handleFileChange} />
    </div>
  );
}
