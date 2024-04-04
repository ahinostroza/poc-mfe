const responseHandler = async (response: Response) => {
  const status = response?.status;
  const { data, message } = await response.json();
  if (status === 200) {
    return data;
  }
  return message;
};

export default responseHandler;
