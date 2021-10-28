import axios from "axios";

export default async function handler(req, res) {
  console.log("[debug] FB get posts id called");

  const { token, ids }: { token: string; ids: string } = req.query;

  if (!token) {
    res.json({ success: false });
    return;
  }

  // ids seperated by ','
  const { data } = await axios.get(
    `https://graph.facebook.com/v12.0/?fields=posts.limit(22){id,message},name&ids=${ids}&access_token=${token}`
  );
  res.json(data);
}
