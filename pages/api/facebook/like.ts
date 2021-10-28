import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as qs from "qs";

async function Like(cookie: any, fb_dtsg: any, postId: any) {
  var data = qs.stringify({
    reaction_type: "1",
    ft_ent_identifier: `${postId}`,
    fb_dtsg,
  });

  console.log("Like POSTID", postId);

  const userId = /c_user=(\d+);/.exec(cookie)[1];

  var config: AxiosRequestConfig = {
    method: "post",
    url: `https://m.facebook.com/ufi/reaction/?ft_ent_identifier=${postId}&story_render_location=permalink&\
    feedback_source=8&feedback_referrer&is_sponsored=0&ext=1635350509\
    &__tn__=%3E*W-R&av=${userId}`,
    headers: {
      "user-agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
      "content-type": "application/x-www-form-urlencoded",
      cookie,
    },
    data: data,
  };

  return await axios(config);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { fb_dtsg, cookie, postId } = req.query;

  // const response: string[] = await getFbCSRF(cookie);
  // const response: AxiosResponse = await Like(cookie, fb_dtsg, postId);
  const response: AxiosResponse = await Like(
    // "sb=jWAyYRd6dyohsqw8i-R7XIfK; datr=jWAyYes3BEhKne4qHdkxR5nB; locale=vi_VN; c_user=100010792892226; spin=r.1004614243_b.trunk_t.1635217295_s.1_v.2_; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1635224722642%2C%22v%22%3A1%7D; dpr=1.25; x-referer=eyJyIjoiL21lbWV0dW9paGNtdXMvIiwiaCI6Ii9tZW1ldHVvaWhjbXVzLyIsInMiOiJtIn0%3D; xs=40%3AJXYFINY2C08WyQ%3A2%3A1635093702%3A-1%3A6207%3A%3AAcVTTAEvdkEkK7_m5f08GheLywRTK2hv28epZH1Yzy0; fr=0F3m3hsNmdgup71VE.AWU_PvsWddb81reMq-95S3RYjfk.Bhd6GE.QI.AAA.0.0.Bhd6GE.AWXfFWeAfBI; m_pixel_ratio=1.25; wd=1519x714",
    cookie,
    fb_dtsg,
    String(postId).split("_")[1]
  );

  res.json(response.data);
}
