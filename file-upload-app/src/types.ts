export type FileType = 'Artwork' | 'Others';

export interface FileItem {
  id: string;
  name: string;
  extension: string;
  size: string;
  version: string;
  fileType: FileType;
  reviewRequired: boolean;
  documentReference?: string;
  thumbnail?: string;
}
