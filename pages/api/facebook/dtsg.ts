import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";

async function getFbCSRF(cookie: string) {
  const response: AxiosResponse<string> = await axios.get(
    "https://m.facebook.com",
    {
      headers: {
        "user-agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
        "content-type": "application/x-www-form-urlencoded",
        cookie,
      },
    }
  );

  const result: string[] =
    /\{"dtsg":\{"token":"(.+?)","valid_for":(\d+),"expire":(\d+)}/.exec(
      response.data
    );

  return [result[1], result[2], result[3]];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("[debug] FB Dtsg called");
  //sb=jWAyYRd6dyohsqw8i-R7XIfK; datr=jWAyYes3BEhKne4qHdkxR5nB; locale=vi_VN; dpr=1.125; m_pixel_ratio=2.0000000298023224; x-referer=eyJyIjoiL2hvbWUucGhwIiwiaCI6Ii9ob21lLnBocCIsInMiOiJtIn0%3D; c_user=100050938710481; xs=1%3AKxCbRegpBvx9qw%3A2%3A1635092418%3A-1%3A12730; fr=0PKDE2Y8iGsbsXW9R.AWXW6X_VTBYnjIc5SNPYhaORVmE.BhdYfB.QI.AAA.0.0.BhdYfB.AWUkIIEMVJ0; spin=r.1004607939_b.trunk_t.1635092424_s.1_v.2_; wd=761x772; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1
  const { cookie }: { cookie: string } = req.body;

  if (!cookie) {
    res.json({ success: false });
    return;
  }

  const response: string[] = await getFbCSRF(cookie);
  // const response: AxiosResponse = await Like(
  //   // "sb=jWAyYRd6dyohsqw8i-R7XIfK; datr=jWAyYes3BEhKne4qHdkxR5nB; locale=vi_VN; c_user=100010792892226; spin=r.1004607916_b.trunk_t.1635079366_s.1_v.2_; x-referer=eyJyIjoiL2Vycm9yL2luZGV4LnBocD9lcnI9ZWMma2Vycj0xMzU3MDMyJmtlcnJfc3VtbWFyeT0lQzQlOTAlQzMlQTMlMjB4JUUxJUJBJUEzeSUyMHJhJTIwbCVFMSVCQiU5N2kma2Vycl9kZXNjcmlwdGlvbj1IJUMzJUEzeSUyMHRoJUUxJUJCJUFEJTIwbCVDMyVBMG0lMjBtJUUxJUJCJTlCaSUyMHRyYW5nJTIwaG8lRTElQkElQjdjJTIwJUM0JTkxJUMzJUIzbmclMjB2JUMzJUEwJTIwbSVFMSVCQiU5RiUyMGwlRTElQkElQTFpJTIwYyVFMSVCQiVBRGElMjBzJUUxJUJCJTk1JTIwdHIlQzMlQUNuaCUyMGR1eSVFMSVCQiU4N3QuIiwiaCI6Ii9lcnJvci9pbmRleC5waHA%2FZXJyPWVjJmtlcnI9MTM1NzAzMiZrZXJyX3N1bW1hcnk9JUM0JTkwJUMzJUEzJTIweCVFMSVCQSVBM3klMjByYSUyMGwlRTElQkIlOTdpJmtlcnJfZGVzY3JpcHRpb249SCVDMyVBM3klMjB0aCVFMSVCQiVBRCUyMGwlQzMlQTBtJTIwbSVFMSVCQiU5QmklMjB0cmFuZyUyMGhvJUUxJUJBJUI3YyUyMCVDNCU5MSVDMyVCM25nJTIwdiVDMyVBMCUyMG0lRTElQkIlOUYlMjBsJUUxJUJBJUExaSUyMGMlRTElQkIlQURhJTIwcyVFMSVCQiU5NSUyMHRyJUMzJUFDbmglMjBkdXklRTElQkIlODd0LiIsInMiOiJtIn0%3D; dpr=1.25; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1635089325856%2C%22v%22%3A1%7D; xs=47%3AbejNPWQcnMYfRQ%3A2%3A1635079361%3A-1%3A6207%3A%3AAcUY34zftRDnQNpF2z013nXpZeV7e-m95qBXH7c_zQ; fr=0hJThzWpj3lINMMgH.AWUFMJOKOTWSuBgFNBHY8CnyYLg.BhdYLo.QI.AAA.0.0.BhdYLo.AWXs_oF5f2k; wd=320x568; m_pixel_ratio=2.0000000298023224; c_user=100010792892226; fr=0DaIlh0faAxA6hhr9.AWUeC29clVpw-jmPS9uN87Q3x84.BhdT3O.QI.AAA.0.0.BhdT3O.AWVl2F7I8TA; xs=26%3ApNMbBjG5DTQXEQ%3A2%3A1634467460%3A-1%3A6207%3A%3AAcWkubBSz-_-ybG1brIGYuf8VplOBqsEPfvvo_TmbzU",
  //   "sb=jWAyYRd6dyohsqw8i-R7XIfK; datr=jWAyYes3BEhKne4qHdkxR5nB; locale=vi_VN; dpr=1.125; m_pixel_ratio=2.0000000298023224; x-referer=eyJyIjoiL2hvbWUucGhwIiwiaCI6Ii9ob21lLnBocCIsInMiOiJtIn0%3D; c_user=100050938710481; xs=1%3AKxCbRegpBvx9qw%3A2%3A1635092418%3A-1%3A12730; fr=0PKDE2Y8iGsbsXW9R.AWXW6X_VTBYnjIc5SNPYhaORVmE.BhdYfB.QI.AAA.0.0.BhdYfB.AWUkIIEMVJ0; spin=r.1004607939_b.trunk_t.1635092424_s.1_v.2_; wd=761x772; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1",
  //   1019980895463848
  // );

  res.json({ success: true, data: response });
}
