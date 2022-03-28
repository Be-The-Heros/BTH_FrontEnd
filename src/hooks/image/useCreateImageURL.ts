import apis from 'apis';
import { useMutation } from 'react-query';
import { API_IMAGE } from './config';

export const useGenerateURLImage = () => {
  return useMutation(async (files: Partial<File>[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file as File);
    });
    return await apis.post<{ urls: string[] }>(API_IMAGE, '/upload', {
      body: formData,
    });
  });
};
