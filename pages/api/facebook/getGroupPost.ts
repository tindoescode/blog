import axios from "axios";

export default async function handler(req, res) {
  console.log("[debug] FB get group post called");

  const { token, groupId }: { token: string; groupId: string } = req.query;

  if (!token || !groupId) {
    res.json({ success: false });
    return;
  }

  const postLimit = 20;

  const { data } = await axios.get(
    `https://graph.facebook.com/${groupId}/feed?fields=&limit=${postLimit}&access_token=${token}`
  );
  res.json(data);
}
