import * as request from 'request-promise-native';

export const downloadFile = (url: string): Promise<string> => request.get(url);
