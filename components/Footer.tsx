interface FooterProps {
  settings: Record<string, string>;
}

export default function Footer({ settings }: FooterProps) {
  const facebookUrl = settings['facebook_url'] || '#';
  const facebookGroupUrl = settings['facebook_group_url'] || '#';
  const youtubeUrl = settings['youtube_url'] || '#';
  const iosUrl = settings['ios_download_url'] || '#';
  const androidUrl = settings['android_download_url'] || '#';
  const paymentUrl = settings['payment_url'] || '/napthe';
  const companyName = settings['company_name'] || 'VMGE';
  const hotline = settings['hotline'] || '0866468126';
  const email = settings['email'] || 'support@example.com';
  const developedBy = settings['developed_by'] || 'TuaansNe';

  return (
    <>
      <div className="footer-ace f-tahoma footer__game __6 tUpper p-r">
        <div className="link-other dFlex aCenter jCenter">
          <a href={facebookUrl} title="" target="_blank" rel="noreferrer">
            <img src="/assets/frontend/teaser/images/footer_game/img-fp.png" alt="Facebook" />
          </a>
          <a href={facebookGroupUrl} title="" target="_blank" rel="noreferrer">
            <img src="/assets/frontend/teaser/images/footer_game/img-gr.png" alt="Group" />
          </a>
          <a href={youtubeUrl} title="" target="_blank" rel="noreferrer">
            <img src="/assets/frontend/teaser/images/footer_game/img-yt.png" alt="YouTube" />
          </a>
        </div>
        <div className="max_rank">
          <div className="footer-ace-inner" itemScope itemType="http://schema.org/Organization">
            <a href="#" className="faq-tink" target="_blank" rel="noreferrer">
              <span itemProp="legalName">{companyName}</span>
            </a>
            <p className="footer-link-privacy">
              <a href="/support" title="Hỗ Trợ" className="bs" target="_blank" rel="noreferrer">Hỗ Trợ</a>
              {' | '}
              <a href="/download" target="_blank" rel="noreferrer" className="bs">Cài Đặt</a>
              {' | '}
              <a href="/policy" title="Điều Khoản" className="bs" target="_blank" rel="noreferrer">Điều Khoản</a>
            </p>
            <p className="tCenter footer-text">Website Phát Triển By {developedBy}</p>
            <p className="tCenter footer-text">HOTLINE: {hotline}</p>
            <p className="tCenter footer-text">EMAIL: {email}</p>
            <img
              src="/assets/frontend/home/v1/images/18_new.png"
              width={255}
              height={100}
              className="footer-ace-18"
              alt="18+"
            />
          </div>
        </div>
      </div>

      <div className="sidebar_right hidden__mobile" style={{ top: '35%' }}>
        <div className="sidebar_right-content tCenter">
          <img src="/assets/frontend/home/v1/images/sibarRight/qr.png" alt="" className="icon-right" />
          <div className="tCenter t-lineok">
            <img src="/assets/frontend/home/v1/images/sibarRight/line.png" alt="" className="line" />
          </div>
          <a target="_blank" href={iosUrl} rel="noreferrer" className="link-dlgame img-hv p-r">
            <img src="/assets/frontend/home/v1/images/sibarRight/ios.png" alt="" className="img-bt" />
            <img src="/assets/frontend/home/v1/images/sibarRight/ios-hv.png" alt="" className="img-hv p-a in-img-hv" />
          </a>
          <a target="_blank" href={androidUrl} rel="noreferrer" className="link-dlgame linkdks-android img-hv p-r">
            <img src="/assets/frontend/home/v1/images/sibarRight/android.png" alt="" className="img-bt" />
            <img src="/assets/frontend/home/v1/images/sibarRight/android-hv.png" alt="" className="img-hv p-a in-img-hv" />
          </a>
          <div className="clickGet m__inline">
            <a target="_blank" href={paymentUrl} rel="noreferrer" className="a100 f-tahomabold tCenter tUpper dFlex aCenter jCenter">
              Nạp thẻ
            </a>
          </div>
          <div className="go-top">
            <img src="/assets/frontend/home/v1/images/sibarRight/top.png" alt="" />
          </div>
        </div>
        <span className="ctFixRight dFlex aCenter jCenter">
          <img src="/assets/frontend/home/v1/images/sibarRight/img-arrow.png" className="imgCtr" alt="" />
        </span>
      </div>
    </>
  );
}
