export const success = <T>(message: string, data: T, code: number = 200) => {
  const response = {
    status: 'success',
    code: code,
    message: message,
    data: data,
  };
  return response;
};

export const failed = (message: string, code: number = 400) => {
  const response = {
    status: 'failed',
    code: code,
    message: message,
    data: null,
  };
  return response;
};
