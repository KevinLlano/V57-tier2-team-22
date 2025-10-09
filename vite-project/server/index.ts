import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID!;
const CLIENT_SECRET = process.env.CLIENT_SECRET!;

app.get("/auth/github", (req, res) => {
  const redirect_uri = "https://localhost:4000/auth/github/callback";
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&scope=repo`
  );
});

interface GitHubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

app.get("/auth/github/callback", async (req, res) => {
  const code = req.query.code as string;

  try {
    const tokenRes = await axios.post<GitHubTokenResponse>(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const accessToken = tokenRes.data.access_token;
    res.redirect(`https://prtrackerr.netlify.app/prs?token=${accessToken}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Authentication failed");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
