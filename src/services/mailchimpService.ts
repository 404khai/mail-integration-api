import axios from "axios";

// Verify Mailchimp key
export const verifyMailchimpKey = async (apiKey: string): Promise<boolean> => {
  try {
    const [key, dc] = apiKey.split("-");
    const url = `https://${dc}.api.mailchimp.com/3.0/`;

    const response = await axios.get(url, {
      auth: { username: "anystring", password: apiKey },
    });

    return response.status === 200;
  } catch {
    return false;
  }
};

// Fetch Mailchimp lists with created_at and error handling
export const fetchMailchimpLists = async (apiKey: string) => {
  try {
    const [key, dc] = apiKey.split("-");
    const url = `https://${dc}.api.mailchimp.com/3.0/lists`;

    const response = await axios.get(url, {
      auth: { username: "anystring", password: apiKey },
    });

    return response.data.lists.map((list: any) => ({
      id: list.id,
      name: list.name,
      created_at: list.date_created, // Mailchimp field
    }));
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw { status: 401, message: "Invalid Mailchimp API Key" };
    } else if (error.response?.status === 429) {
      throw { status: 429, message: "Mailchimp rate limit exceeded. Try again later." };
    } else {
      throw { status: 500, message: "Something went wrong with Mailchimp API" };
    }
  }
};
