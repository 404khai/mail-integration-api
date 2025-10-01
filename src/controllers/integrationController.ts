import { Request, Response } from "express";
import Integration from "../models/Integration";
import { verifyMailchimpKey, fetchMailchimpLists } from "../services/mailchimpService";
import { verifyGetResponseKey, fetchGetResponseLists } from "../services/getresponseService";

export const saveIntegration = async (req: Request, res: Response) => {
  try {
    const { userId, provider, apiKey } = req.body;

    if (!["mailchimp", "getresponse"].includes(provider)) {
      return res.status(400).json({ error: "Invalid provider" });
    }

    let isValid = false;
    if (provider === "mailchimp") isValid = await verifyMailchimpKey(apiKey);
    if (provider === "getresponse") isValid = await verifyGetResponseKey(apiKey);

    if (!isValid) return res.status(400).json({ error: "Invalid API key" });

    const integration = await Integration.create({ userId, provider, apiKey });
    res.status(201).json(integration);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


export const getLists = async (req: Request, res: Response) => {
  try {
    const { userId, provider } = req.query;
    const integration = await Integration.findOne({ userId, provider });

    if (!integration) {
      return res.status(404).json({ error: "Integration not found" });
    }

    let lists;
    if (provider === "mailchimp") {
      lists = await fetchMailchimpLists(integration.apiKey);
    } else if (provider === "getresponse") {
      lists = await fetchGetResponseLists(integration.apiKey);
    }

    res.json(lists);
  } catch (err: any) {
    res.status(err.status || 500).json({ error: err.message || "Failed to fetch lists" });
  }
};

