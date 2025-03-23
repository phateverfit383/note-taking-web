export const getAccessToken = () => {
  const accessToken = localStorage.getItem("access-token");
  return accessToken || "";
};

export const saveToken = (data: any) => {
  const { access_token } = data;

  localStorage.setItem("access-token", access_token);
};

export const removeToken = () => {
  localStorage.removeItem("access-token");
};
