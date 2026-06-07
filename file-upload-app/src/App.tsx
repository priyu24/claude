import React, { useState } from 'react';
import './App.css';
import { mockFiles } from './data';
import { FileItem, FileType } from './types';
import ListView from './components/ListView';
import GridView from './components/GridView';

type ViewMode = 'list' | 'grid';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [search, setSearch] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState<string>('All');

  const filtered = files.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchType = fileTypeFilter === 'All' || f.fileType === fileTypeFilter;
    return matchSearch && matchType;
  });

  const toggleReview = (id: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, reviewRequired: !f.reviewRequired } : f))
    );
  };

  const updateFileType = (id: string, fileType: FileType) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, fileType } : f))
    );
  };

  const removeDocRef = (id: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, documentReference: undefined } : f))
    );
  };

  return (
    <div className="app-bg">
      <div className="side-note">Only Artwork will have Document References.</div>
      <div className="app-container">
        {/* Header */}
        <div className="task-header">
          <button className="back-btn">&#8592;</button>
          <div className="upload-icon-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B6CF6" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <h2 className="task-title">Artwork_upload</h2>
          <span className="due-date">Due date: 27 June 2025</span>
          <div style={{ flex: 1 }} />
          <button className="complete-btn">Complete task</button>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <button className="upload-files-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload Files
          </button>

          <div className="search-box">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search files"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={fileTypeFilter}
            onChange={(e) => setFileTypeFilter(e.target.value)}
          >
            <option value="All">File type</option>
            <option value="Artwork">Artwork</option>
            <option value="Others">Others</option>
          </select>

          <button className="filter-icon-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
          </button>

          <div style={{ flex: 1 }} />

          {/* View toggle */}
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <circle cx="3" cy="6" r="1" fill="currentColor" />
                <circle cx="3" cy="12" r="1" fill="currentColor" />
                <circle cx="3" cy="18" r="1" fill="currentColor" />
              </svg>
            </button>
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
          </div>

          <select className="sort-select">
            <option>Sort by</option>
            <option>Name</option>
            <option>Size</option>
            <option>Type</option>
          </select>
        </div>

        <p className="showing-count">Showing {filtered.length} files</p>

        {viewMode === 'list' ? (
          <ListView
            files={filtered}
            onToggleReview={toggleReview}
            onUpdateFileType={updateFileType}
            onRemoveDocRef={removeDocRef}
          />
        ) : (
          <GridView
            files={filtered}
            onToggleReview={toggleReview}
            onUpdateFileType={updateFileType}
            onRemoveDocRef={removeDocRef}
          />
        )}
      </div>
    </div>
  );
}

export default App;
