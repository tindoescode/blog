import axios from "axios";

export default async function handler(req, res) {
  console.log("[debug] FB get friend called");

  const { token }: { token: string } = req.query;

  if (!token) {
    res.json({ success: false });
    return;
  }

  const { data } = await axios.get(
    `https://graph.facebook.com/v12.0/me?fields=friends.limit(5000)&access_token=${token}`
  );
  res.json(data);
}
