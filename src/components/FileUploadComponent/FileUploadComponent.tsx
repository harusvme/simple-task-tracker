import React, { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFiles } from "../../actions/fileActions";
import { RootState } from "../../reducers/rootReducer";

interface FileUploadProps {
  taskId: number;
}

const FileUploadComponent: React.FC<FileUploadProps> = ({ taskId }) => {
  const taskFiles = useSelector((state: RootState) => state.file[taskId] || []);
  const dispatch = useDispatch();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);

      dispatch(updateFiles(taskId, [...taskFiles, ...newFiles]));

      event.target.value = "";
    }
  };

  const handleDeleteFile = (fileName: string) => {
    const updatedFiles = taskFiles.filter((file) => file.name !== fileName);

    dispatch(updateFiles(taskId, updatedFiles));
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileUpload} />
      <ul>
        {taskFiles.map((file, index) => (
          <li key={index}>
            {file.name}{" "}
            <a href={URL.createObjectURL(file)} download={file.name}>
              Скачать
            </a>
            <button onClick={() => handleDeleteFile(file.name)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUploadComponent;
