# 📧 ESP Integration API (Mailchimp + GetResponse)

This project is a **Node.js + TypeScript REST API** that allows users to:

- ✅ Connect their **Mailchimp** or **GetResponse** accounts using API keys  
- ✅ Validate API credentials  
- ✅ Retrieve mailing lists (audiences / campaigns) with metadata  
- ✅ Handle common errors gracefully (invalid keys, rate limiting, etc.)

Built with:
- [Express](https://expressjs.com/)  
- [MongoDB (Mongoose)](https://mongoosejs.com/)  
- [Axios](https://axios-http.com/)  

---

## 🚀 Features
- `POST /api/integrations/esp` → Save and validate Mailchimp / GetResponse API credentials  
- `GET /api/integrations/esp/lists` → Fetch all lists (audiences/campaigns) from the connected ESP  
- Error handling for:
  - Invalid API keys (401)  
  - Rate limit exceeded (429)  
  - Network / server errors (500)  

Each list includes:
```json
{
  "id"
  "name"
  "created_at"
  "subscriber_count"
}

