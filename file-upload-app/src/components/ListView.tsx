import React from 'react';
import { FileItem, FileType } from '../types';
import { FileThumbnail, FileTypeSelect, ReviewToggle, DocRefTag } from './FileActions';

interface Props {
  files: FileItem[];
  onToggleReview: (id: string) => void;
  onUpdateFileType: (id: string, fileType: FileType) => void;
  onRemoveDocRef: (id: string) => void;
}

export default function ListView({ files, onToggleReview, onUpdateFileType, onRemoveDocRef }: Props) {
  return (
    <div className="list-view">
      <div className="list-header">
        <div className="col-check"><input type="checkbox" /></div>
        <div className="col-name">File name</div>
        <div className="col-type">File type</div>
        <div className="col-review">Review required</div>
        <div className="col-doc">Document references</div>
        <div className="col-menu" />
      </div>
      {files.map((file) => (
        <div key={file.id} className="list-row">
          <div className="col-check"><input type="checkbox" /></div>
          <div className="col-name">
            <FileThumbnail file={file} />
            <div className="file-info">
              <span className="file-name">{file.name}</span>
              <span className="file-version badge">{file.version}</span>
              <span className="file-meta">{file.extension} · {file.size}</span>
            </div>
          </div>
          <div className="col-type">
            <FileTypeSelect file={file} onUpdateFileType={onUpdateFileType} />
          </div>
          <div className="col-review">
            <ReviewToggle file={file} onToggleReview={onToggleReview} />
          </div>
          <div className="col-doc">
            <DocRefTag file={file} onRemoveDocRef={onRemoveDocRef} />
          </div>
          <div className="col-menu">
            <button className="menu-btn">···</button>
          </div>
        </div>
      ))}
    </div>
  );
}
