import axios from "axios";

export const verifyGetResponseKey = async (apiKey: string) => {
  try {
    const res = await axios.get("https://api.getresponse.com/v3/accounts", {
      headers: { "X-Auth-Token": `api-key ${apiKey}` },
    });
    return res.status === 200;
  } catch {
    return false;
  }
};

export const fetchGetResponseLists = async (apiKey: string) => {
  const res = await axios.get("https://api.getresponse.com/v3/campaigns", {
    headers: { "X-Auth-Token": `api-key ${apiKey}` },
  });

  return res.data.map((campaign: any) => ({
    id: campaign.campaignId,
    name: campaign.name,
  }));
};
