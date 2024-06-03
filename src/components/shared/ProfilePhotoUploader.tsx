import { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { toast } from "../ui/use-toast";

type FileUploaderProps = {
  fieldChange: (file: File[]) => void;
  imageURL: URL | string;
};

const ProfilePhotoUploader = ({ fieldChange, imageURL }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileURL, setFileURL] = useState(`${imageURL}`);
  const navigate = useNavigate();

   if (!fileURL) {
    navigate(-1);
    toast({ title: "Something went wrong!", variant: "destructive" });
   } 

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
      {fileURL && (
        <div className="flex justify-start items-center gap-5">
          <img
            src={fileURL}
            alt="profile photo"
            className="rounded-full h-20 w-20 sm:h-28 sm:w-28 object-cover object-center"
          />
          <p className="text-blue-500 text-sm sm:text-base font-semibold cursor-pointer">Change Profile Picture</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoUploader;
