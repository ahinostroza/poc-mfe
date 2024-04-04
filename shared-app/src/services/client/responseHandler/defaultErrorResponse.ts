const responseErrorHandler = async (response: Response) => {
  const status = response?.status;
  const { data, detail, message, errorCode } = await response.json();
  if (status === 200) {
    return data;
  }
  return {
    detail,
    errorCode,
    message
  };
};

export default responseErrorHandler;
