import React from 'react';
import { FileItem, FileType } from '../types';

interface Props {
  file: FileItem;
  onToggleReview: (id: string) => void;
  onUpdateFileType: (id: string, fileType: FileType) => void;
  onRemoveDocRef: (id: string) => void;
}

export function FileThumbnail({ file }: { file: FileItem }) {
  const colors: Record<string, string> = {
    PDF: '#e74c3c',
    FIG: '#a855f7',
    PNG: '#3b82f6',
    JPG: '#f59e0b',
  };
  const color = colors[file.extension] || '#6b7280';

  return (
    <div className="file-thumb" style={{ background: color }}>
      <span className="file-ext">{file.extension}</span>
    </div>
  );
}

export function FileTypeSelect({ file, onUpdateFileType }: Pick<Props, 'file' | 'onUpdateFileType'>) {
  return (
    <select
      className="filetype-select"
      value={file.fileType}
      onChange={(e) => onUpdateFileType(file.id, e.target.value as FileType)}
    >
      <option value="Artwork">Artwork</option>
      <option value="Others">Others</option>
    </select>
  );
}

export function ReviewToggle({ file, onToggleReview }: Pick<Props, 'file' | 'onToggleReview'>) {
  return (
    <label className="toggle-wrap">
      <input
        type="checkbox"
        checked={file.reviewRequired}
        onChange={() => onToggleReview(file.id)}
        disabled={file.fileType !== 'Artwork'}
      />
      <span className={`toggle-slider ${file.fileType !== 'Artwork' ? 'disabled' : ''}`} />
      <span className="toggle-label">Mark for Review</span>
    </label>
  );
}

export function DocRefTag({ file, onRemoveDocRef }: Pick<Props, 'file' | 'onRemoveDocRef'>) {
  if (!file.documentReference) return null;
  return (
    <span className="doc-ref-tag">
      {file.documentReference}
      <button className="doc-ref-remove" onClick={() => onRemoveDocRef(file.id)}>×</button>
    </span>
  );
}
