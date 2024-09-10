import { FaPaperclip } from "react-icons/fa";
import { TFileItemProps } from "./FileItem.model";
import { BiTrash } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { IoTrashBinOutline } from "react-icons/io5";
import { PiTrashSimpleBold } from "react-icons/pi";

const FileItem = ({ name, size, removeFile }: TFileItemProps) => {
  return (
    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
      <div className="flex w-0 flex-1 items-center">
        <FaPaperclip
          className="h-5 w-5 flex-shrink-0 text-gray-400"
          aria-hidden="true"
        />
        <div className="ml-4 flex min-w-0 flex-1 gap-2">
          <span className="truncate font-medium">{name}</span>
          <span className="flex-shrink-0 text-gray-400">{size}mb</span>
        </div>
      </div>
      <div className="ml-4 flex-shrink-0">
        <button
          type="button"
          className="flex items-center gap-x-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={() => removeFile(name)}
        >
          <PiTrashSimpleBold className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
};

export default FileItem;
