import axios from "axios";

// Verify Mailchimp key
export const verifyMailchimpKey = async (apiKey: string): Promise<boolean> => {
  try {
    // Ping Mailchimp API root
    const response = await axios.get("https://usX.api.mailchimp.com/3.0/", {
      headers: { Authorization: `apikey ${apiKey}` }
    });
    return response.status === 200;
  } catch (error: any) {
    return false;
  }
};

// Fetch Mailchimp lists
export const fetchMailchimpLists = async (apiKey: string) => {
  try {
    const response = await axios.get("https://usX.api.mailchimp.com/3.0/lists", {
      headers: { Authorization: `apikey ${apiKey}` }
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw { status: 401, message: "Invalid Mailchimp API Key" };
    } else if (error.response?.status === 429) {
      throw { status: 429, message: "Rate limit exceeded. Please try again later." };
    } else {
      throw { status: 500, message: "Something went wrong with Mailchimp API" };
    }
  }
};
