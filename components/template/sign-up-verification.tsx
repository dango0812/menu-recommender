interface VerificationEmailProps {
  name: string;
  verificationUrl: string;
}

export function verificationEmail({ name, verificationUrl }: VerificationEmailProps): string {
  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin:0; padding:0; background-color:#F4F7FA; font-family:-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:60px 20px;">
        <tr>
          <td align="center">
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:480px; background-color:#ffffff; border-radius:24px; box-shadow:0 20px 40px rgba(0,0,0,0.08); overflow:hidden;">

              <tr>
                <td style="padding:50px 40px; text-align:center;">
                  <div style="margin-bottom:24px; font-size:28px; font-weight:900; color:#111111; letter-spacing:-1px;">
                    <span style="color:#FF8A00;">와구</span>와규
                  </div>

                  <h2 style="margin:0 0 16px 0; font-size:22px; color:#111111; font-weight:700; line-height:1.4;">
                    환영합니다, ${name}님!
                  </h2>
                  <p style="margin:0 0 40px 0; font-size:15px; color:#666666; line-height:1.6;">
                    와구와규 서비스를 시작하기 위해<br/>
                    아래 버튼을 눌러 이메일 인증을 완료해 주세요.
                  </p>

                  <a href="${verificationUrl}" 
                    style="display:inline-block; padding:18px 0; width:100%; background-color:#FF8A00; color:#ffffff; text-decoration:none; border-radius:14px; font-size:16px; font-weight:600; text-align:center; transition: background-color 0.2s;">
                    시작하기
                  </a>

                  <p style="margin-top:30px; font-size:13px; color:#AEB5BC;">
                    본 링크는 1시간 동안만 유효합니다.
                  </p>
                </td>
              </tr>
            </table>

            <table width="100%" style="max-width:480px; text-align:center; margin-top:24px;">
              <tr>
                <td>
                  <p style="margin:0; font-size:12px; color:#AEB5BC; letter-spacing:-0.5px;">
                    &copy; 2026 와구와규. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>

          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
