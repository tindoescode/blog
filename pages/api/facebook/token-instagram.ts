import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

async function getFbToken(cookie: string) {
  const response: AxiosResponse<string> = await axios.get(
    "https://www.facebook.com/dialog/oauth?client_id=124024574287414&redirect_uri=https://www.instagram.com/accounts/signup/&&scope=email&response_type=token",
    {
      headers: {
        authority: "m.facebook.com",
        "cache-control": "max-age=0",
        "sec-ch-ua":
          '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        dnt: "1",
        "upgrade-insecure-requests": "1",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4676.0 Safari/537.36",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "sec-fetch-site": "cross-site",
        "sec-fetch-mode": "navigate",
        "sec-fetch-user": "?1",
        "sec-fetch-dest": "document",
        "accept-language": "en-US,en;q=0.9,vi;q=0.8",
        cookie,
      },
    }
  );

  const result: string[] = /access_token=(.+?)&/.exec(
    response.request.res.responseUrl
  );

  return result[1];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("[debug] Facebook token called");
  //

  // const cookie =
  //   "sb=jWAyYRd6dyohsqw8i-R7XIfK; datr=jWAyYes3BEhKne4qHdkxR5nB; locale=vi_VN; m_pixel_ratio=1.25; c_user=100010792892226; spin=r.1004607974_b.trunk_t.1635093706_s.1_v.2_; xs=40%3AJXYFINY2C08WyQ%3A2%3A1635093702%3A-1%3A6207%3A%3AAcWkPwyJkbAwEnNzPXKSLvaT9P3ZWktOSulMJpcpSA; fr=0knqlNfb8kLJUoFxf.AWWc8Ncx1s_YmcZYKVM1R11SG00.BhdZ5a.QI.AAA.0.0.BhdZ5a.AWVJwQwrNZk; dpr=1.25; x-referer=eyJyIjoiL2hvbWUucGhwIiwiaCI6Ii9ob21lLnBocCIsInMiOiJtIn0%3D; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1635099014362%2C%22v%22%3A1%7D; wd=1536x714";
  const { cookie }: { cookie: string } = req.body;

  if (!cookie) {
    res.json({ success: false });
    return;
  }

  const response: string = await getFbToken(cookie);
  // const response: AxiosResponse = await Like(
  //   // "sb=jWAyYRd6dyohsqw8i-R7XIfK; datr=jWAyYes3BEhKne4qHdkxR5nB; locale=vi_VN; c_user=100010792892226; spin=r.1004607916_b.trunk_t.1635079366_s.1_v.2_; x-referer=eyJyIjoiL2Vycm9yL2luZGV4LnBocD9lcnI9ZWMma2Vycj0xMzU3MDMyJmtlcnJfc3VtbWFyeT0lQzQlOTAlQzMlQTMlMjB4JUUxJUJBJUEzeSUyMHJhJTIwbCVFMSVCQiU5N2kma2Vycl9kZXNjcmlwdGlvbj1IJUMzJUEzeSUyMHRoJUUxJUJCJUFEJTIwbCVDMyVBMG0lMjBtJUUxJUJCJTlCaSUyMHRyYW5nJTIwaG8lRTElQkElQjdjJTIwJUM0JTkxJUMzJUIzbmclMjB2JUMzJUEwJTIwbSVFMSVCQiU5RiUyMGwlRTElQkElQTFpJTIwYyVFMSVCQiVBRGElMjBzJUUxJUJCJTk1JTIwdHIlQzMlQUNuaCUyMGR1eSVFMSVCQiU4N3QuIiwiaCI6Ii9lcnJvci9pbmRleC5waHA%2FZXJyPWVjJmtlcnI9MTM1NzAzMiZrZXJyX3N1bW1hcnk9JUM0JTkwJUMzJUEzJTIweCVFMSVCQSVBM3klMjByYSUyMGwlRTElQkIlOTdpJmtlcnJfZGVzY3JpcHRpb249SCVDMyVBM3klMjB0aCVFMSVCQiVBRCUyMGwlQzMlQTBtJTIwbSVFMSVCQiU5QmklMjB0cmFuZyUyMGhvJUUxJUJBJUI3YyUyMCVDNCU5MSVDMyVCM25nJTIwdiVDMyVBMCUyMG0lRTElQkIlOUYlMjBsJUUxJUJBJUExaSUyMGMlRTElQkIlQURhJTIwcyVFMSVCQiU5NSUyMHRyJUMzJUFDbmglMjBkdXklRTElQkIlODd0LiIsInMiOiJtIn0%3D; dpr=1.25; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1635089325856%2C%22v%22%3A1%7D; xs=47%3AbejNPWQcnMYfRQ%3A2%3A1635079361%3A-1%3A6207%3A%3AAcUY34zftRDnQNpF2z013nXpZeV7e-m95qBXH7c_zQ; fr=0hJThzWpj3lINMMgH.AWUFMJOKOTWSuBgFNBHY8CnyYLg.BhdYLo.QI.AAA.0.0.BhdYLo.AWXs_oF5f2k; wd=320x568; m_pixel_ratio=2.0000000298023224; c_user=100010792892226; fr=0DaIlh0faAxA6hhr9.AWUeC29clVpw-jmPS9uN87Q3x84.BhdT3O.QI.AAA.0.0.BhdT3O.AWVl2F7I8TA; xs=26%3ApNMbBjG5DTQXEQ%3A2%3A1634467460%3A-1%3A6207%3A%3AAcWkubBSz-_-ybG1brIGYuf8VplOBqsEPfvvo_TmbzU",
  //   "sb=jWAyYRd6dyohsqw8i-R7XIfK; datr=jWAyYes3BEhKne4qHdkxR5nB; locale=vi_VN; dpr=1.125; m_pixel_ratio=2.0000000298023224; x-referer=eyJyIjoiL2hvbWUucGhwIiwiaCI6Ii9ob21lLnBocCIsInMiOiJtIn0%3D; c_user=100050938710481; xs=1%3AKxCbRegpBvx9qw%3A2%3A1635092418%3A-1%3A12730; fr=0PKDE2Y8iGsbsXW9R.AWXW6X_VTBYnjIc5SNPYhaORVmE.BhdYfB.QI.AAA.0.0.BhdYfB.AWUkIIEMVJ0; spin=r.1004607939_b.trunk_t.1635092424_s.1_v.2_; wd=761x772; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1",
  //   1019980895463848
  // );

  res.json({ success: true, data: response });
}
