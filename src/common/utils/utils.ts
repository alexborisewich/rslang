// eslint-disable-next-line import/prefer-default-export
export const parseID = (string: string): number => parseInt(string.replace(/[^\d]/g, ''), 10);
