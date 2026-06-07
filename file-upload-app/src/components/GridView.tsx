import React from 'react';
import { FileItem, FileType } from '../types';
import { FileThumbnail, FileTypeSelect, ReviewToggle, DocRefTag } from './FileActions';

interface Props {
  files: FileItem[];
  onToggleReview: (id: string) => void;
  onUpdateFileType: (id: string, fileType: FileType) => void;
  onRemoveDocRef: (id: string) => void;
}

export default function GridView({ files, onToggleReview, onUpdateFileType, onRemoveDocRef }: Props) {
  return (
    <div className="grid-view">
      {files.map((file) => (
        <div key={file.id} className="grid-card">
          <div className="grid-card-preview">
            <input type="checkbox" className="grid-checkbox" />
            <FileThumbnail file={file} />
            <button className="menu-btn grid-menu-btn">···</button>
          </div>

          <div className="grid-card-body">
            <div className="grid-name-row">
              <span className="file-name">{file.name}</span>
              <span className="file-version badge">{file.version}</span>
            </div>
            <span className="file-meta">{file.extension} · {file.size}</span>

            <div className="grid-field">
              <span className="grid-label">File type</span>
              <FileTypeSelect file={file} onUpdateFileType={onUpdateFileType} />
            </div>

            <div className="grid-field">
              <span className="grid-label">Review required</span>
              <ReviewToggle file={file} onToggleReview={onToggleReview} />
            </div>

            {file.fileType === 'Artwork' && (
              <div className="grid-field">
                <span className="grid-label">Document references</span>
                <DocRefTag file={file} onRemoveDocRef={onRemoveDocRef} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
