import axios, { AxiosResponse } from "axios";
import { useState, useCallback, useEffect } from "react";

interface Props {
  onFail: () => void;
}

export interface FriendInfo {
  id: string;
  name: string;
}

export default function useFbAPI(props: Props) {
  // Main data
  const [cookie, setCookie] = useState<string>();
  const [fb_dtsg, setfb_dtsg] = useState<string>();
  const [token, setToken] = useState<string>();
  const [tokenFull, setTokenFull] = useState<string>(); // only use for get api for reducing spam

  useEffect(() => {
    if (!cookie) return;

    console.log("[debug] useEffect useFbApi called");
    async function fetchData() {
      try {
        // Get token and dtsg
        const fetchDtsg: Promise<AxiosResponse<any>> = axios.post(
          "/api/facebook/dtsg",
          {
            cookie: cookie,
          }
        );

        const fetchToken: Promise<AxiosResponse<any>> = axios.post(
          "/api/facebook/token",
          {
            cookie: cookie,
          }
        );

        const fetchTokenFullRights: Promise<AxiosResponse<any>> = axios.post(
          "/api/facebook/token-instagram",
          {
            cookie: cookie,
          }
        );

        var [dtsg, token, tokenFull] = await Promise.all([
          fetchDtsg,
          fetchToken,
          fetchTokenFullRights,
        ]);

        if (token.data.success) {
          setfb_dtsg(dtsg.data.data[0]);
          setToken(token.data.data);
          setTokenFull(tokenFull.data.data);

          // logging("Đăng nhập thành công");
        }
      } catch (error) {
        props.onFail();
      }
    }

    fetchData();
  }, [cookie]);

  const fetchFriendList = useCallback(async () => {
    if (!token) {
      throw new Error("No access token");
    }

    const response: AxiosResponse<any> = await axios.get(
      `/api/facebook/getFriendByToken?token=${token}`
    );

    return response.data.friends.data;
  }, [token]);

  const fetchPosts = useCallback(
    async (ids: Array<string>) => {
      if (!token) {
        throw new Error("No access token");
      }

      const response: AxiosResponse<any> = await axios.get(
        `/api/facebook/getPostId?token=${token}&ids=${ids}`
      );

      return response.data;
    },

    [token]
  );

  const fetchGroupPost = useCallback(
    // tokenFull
    async (id: string) => {
      if (!token) {
        throw new Error("No access token");
      }

      const response: AxiosResponse<any> = await axios.get(
        `/api/facebook/getGroupPost?token=${tokenFull}&groupId=${id}`
      );

      return response.data;
    },

    [tokenFull]
  );

  const like = useCallback(
    async (ids: Array<string>) => {
      if (!token) {
        throw new Error("No access token");
      }

      const response: AxiosResponse<any> = await axios.get(
        `/api/facebook/like?cookie=${cookie}&fb_dtsg=${fb_dtsg}&postId=${ids[0]}`
      );

      return response.data;
    },

    [token]
  );

  return {
    like,
    cookie,
    setCookie,
    fb_dtsg,
    token,
    tokenFull,
    fetchFriendList,
    fetchPosts,
    fetchGroupPost,
  };
}
