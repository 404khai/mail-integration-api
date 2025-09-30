import axios from "axios";

export const verifyMailchimpKey = async (apiKey: string) => {
  try {
    const [key, dc] = apiKey.split("-");
    const url = `https://${dc}.api.mailchimp.com/3.0/`;

    const res = await axios.get(url, {
      auth: { username: "anystring", password: apiKey },
    });

    return res.status === 200;
  } catch {
    return false;
  }
};

export const fetchMailchimpLists = async (apiKey: string) => {
  const [key, dc] = apiKey.split("-");
  const url = `https://${dc}.api.mailchimp.com/3.0/lists`;

  const res = await axios.get(url, {
    auth: { username: "anystring", password: apiKey },
  });

  return res.data.lists.map((list: any) => ({
    id: list.id,
    name: list.name,
  }));
};
