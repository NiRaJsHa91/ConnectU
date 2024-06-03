import { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

type FileUploaderProps = {
  fieldChange: (file: File[]) => void,
  imageURL: string
}

const FileUploader = ({ fieldChange, imageURL }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileURL, setFileURL] = useState(imageURL);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileURL(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    //  maxFiles: 1,
    accept: {
      "image/*": [".svg", ".png", ".jpg", ".jpeg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {fileURL ? (
        <>
          <div className="flex flex-1 p-5 lg:p-5 h-[280px] sm:h-[350px] md:h-[380px] xl:h-[400px] w-full bg-dark-3 rounded-lg">
            <img
              src={fileURL}
              alt="file_uploader"
              className=" w-full object-contain h-full"
            />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center bg-dark-3 rounded-xl h-52">
          <img
            height={80}
            width={80}
            src="/assets/icons/file-upload.svg"
            alt=""
          />
          <h3 className="text-lg font-normal">Drap photo here</h3>
          <p className="text-light-3 text-[12px]">SVG, PNG, JPG</p>

          <p className="mt-4 border p-2 rounded-lg text-sm cursor-pointer">Select image file</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
