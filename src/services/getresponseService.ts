import axios from "axios";

// Verify GetResponse key
export const verifyGetResponseKey = async (apiKey: string): Promise<boolean> => {
  try {
    const res = await axios.get("https://api.getresponse.com/v3/accounts", {
      headers: { "X-Auth-Token": `api-key ${apiKey}` },
    });
    return res.status === 200;
  } catch {
    return false;
  }
};

// Fetch GetResponse campaigns (lists) with created_at and contact count
export const fetchGetResponseLists = async (apiKey: string) => {
  try {
    const res = await axios.get("https://api.getresponse.com/v3/campaigns", {
      headers: { "X-Auth-Token": `api-key ${apiKey}` },
    });

    return res.data.map((campaign: any) => ({
      id: campaign.campaignId,
      name: campaign.name,
      created_at: campaign.createdOn, 
      contact_count: campaign.contactsCount ?? 0,
    }));
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw { status: 401, message: "Invalid GetResponse API Key" };
    } else if (error.response?.status === 429) {
      throw { status: 429, message: "GetResponse rate limit exceeded. Try again later." };
    } else {
      throw { status: 500, message: "Something went wrong with GetResponse API" };
    }
  }
};
