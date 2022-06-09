import { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";

export default function withHandler(
  method: "GET" | "POST" | "DELETE",
  apiFn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      return res.status(400).end();
    }
    try {
      await apiFn(req, res);
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  };
}