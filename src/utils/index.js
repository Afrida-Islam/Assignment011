import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=ca5944faefcb468a75792cd6905a4757`,
    formData
  );
  return data?.data?.display_url;
};

export const saveOrUpdateUser = async (userData, token) => {
  const { data } = await axios.post(
    `https://serverside11.vercel.app/user`,
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
