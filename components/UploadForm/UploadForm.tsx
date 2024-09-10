"use client";

import {
  FormEvent,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { SiMicrosoftexcel } from "react-icons/si";
import FileItem from "@/components/FileItem";
import { BiUpload } from "react-icons/bi";
import { GrCloudUpload } from "react-icons/gr";

import classNames from "@/utils/classNames";
import { TFileItemProps } from "../FileItem/FileItem.model";
import { useMutation } from "@tanstack/react-query";
import { wretchClientSide } from "@/utils/wretchClientSide";
import { WretchError } from "wretch";
import wretch from "wretch";
import { formDataAddon } from "wretch/addons";
const UploadForm = () => {
  const [files, setFile] = useState<TFileItemProps[]>([]);
  const [formData, setFormData] = useState<FormData>();

  const removeFile = useCallback(
    (name: string) => {
      formData?.delete(name);
      setFile((prev) => prev.filter(({ name: prevName }) => prevName !== name));
    },
    [formData]
  );

  const handleChange = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      const formData = new FormData();

      for (let i = 0; i < fileList.length; i++) {
        formData.append("files[]", fileList[i]);
      }

      setFormData(formData);

      const filesArray: TFileItemProps[] = Array.from(fileList).map((file) => ({
        name: file.name,
        size: Number((file.size / 1048576).toFixed(2)),
        removeFile,
      }));
      setFile(filesArray);
    },
    [removeFile]
  );

  const { mutate } = useMutation<boolean, WretchError, FormData>({
    mutationFn: async (formData) => {
      try {
        const data = await wretchClientSide<boolean>().post(
          formData,
          "/file/parse"
        );

        console.log(data);
        return data;
      } catch (error) {
        console.log(error, "ERROR");
      }
    },
  });

  // useEffect(() => {
  //   console.log(files, "files");
  // }, [files]);

  // useEffect(() => {
  //   console.log(formData, "formData");
  // }, [formData]);

  return (
    <div className="flex w-full max-w-screen-lg px-4 flex-col h-screen justify-center items-center container mx-auto">
      <div className="flex p-4 rounded-xl justify-center border border-gray-900/25 flex-col gap-2 w-full bg-white">
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Excel to JSON service
        </label>

        <div className="flex justify-center rounded-lg border w-full border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <SiMicrosoftexcel
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex flex-wrap justify-center text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a files</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  onChange={(event) => handleChange(event.target.files)}
                />
              </label>
              {/* <p className="pl-1">or drag and drop</p> */}
            </div>
            <p className="text-xs leading-5 text-gray-600">
              XLSX, XLX up to 5MB each
            </p>
          </div>
        </div>

        {formData && files.length ? (
          <>
            {files.map((file, index) => (
              <FileItem key={index} {...file} />
            ))}
            <button
              type="button"
              className="flex items-center gap-x-2 rounded-md w-fit  bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => mutate(formData)}
            >
              <GrCloudUpload className="w-5 h-5" /> Upload
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default UploadForm;
