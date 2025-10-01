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

## Features
- `POST /api/integrations/esp` → Save and validate Mailchimp / GetResponse API credentials  
- `GET /api/integrations/esp/lists` → Fetch all lists (audiences/campaigns) from the connected ESP
- Note: the esp/lists api is param based since I had no JWT or auth system to work with so for instance use: `/api/integrations/esp/lists?userId=user1&provider=mailchimp`
- Query Params:
  - userId (string) → your app’s user identifier
  - provider (mailchimp | getresponse)
    
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


```
## Cloning the repository
```bash
git clone https://github.com/404khai/mail-integration-api.git
cd mail-integration-api


```
## Install dependencies
```bash
npm install


```
## Environment variables
- Create a .env file in the project root:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/espIntegration?retryWrites=true&w=majority


```
## 🚀 Run the server
```bash
npm run dev
