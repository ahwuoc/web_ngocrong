import { query, queryOne } from '@/lib/db';
import { getSession } from '@/lib/session';
import { getSetting } from '@/lib/settings';
import { Post, Slide, Account } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import HeroLogo from '@/components/HeroLogo';
import Footer from '@/components/Footer';

async function getPostsByCategory(slug: string, limit = 5, serverId = 1): Promise<Post[]> {
  return query<Post>(
    `SELECT p.*, c.name as category_name FROM posts p
     JOIN categories c ON p.category_id = c.id
     WHERE c.slug = ? AND p.status = 'published'
     ORDER BY p.published_at DESC LIMIT ${Number(limit)}`,
    [slug],
    serverId
  );
}

export default async function HomePage() {
  const session = await getSession();
  const serverId = session.serverId ?? 1;

  const [slides, tinTuc, suKien, huongDan] = await Promise.all([
    query<Slide>("SELECT * FROM slides WHERE status = 'active' ORDER BY sort_order ASC", [], serverId),
    getPostsByCategory('tin-tuc', 5, serverId),
    getPostsByCategory('su-kien', 5, serverId),
    getPostsByCategory('huong-dan', 5, serverId),
  ]);

  const [siteName, siteDesc, siteKeywords, iosUrl, androidUrl, apkUrl, paymentUrl, fbUrl, fbGroupUrl] = await Promise.all([
    getSetting('site_name'),
    getSetting('site_description'),
    getSetting('site_keywords'),
    getSetting('ios_download_url'),
    getSetting('android_download_url'),
    getSetting('apk_download_url'),
    getSetting('payment_url'),
    getSetting('facebook_url'),
    getSetting('facebook_group_url'),
  ]);

  const settings: Record<string, string> = {
    site_name: siteName, site_description: siteDesc, site_keywords: siteKeywords,
    ios_download_url: iosUrl, android_download_url: androidUrl, apk_download_url: apkUrl,
    payment_url: paymentUrl, facebook_url: fbUrl, facebook_group_url: fbGroupUrl,
    youtube_url: await getSetting('youtube_url'),
    company_name: await getSetting('company_name', 'VMGE'),
    hotline: await getSetting('hotline', '0866468126'),
    email: await getSetting('email'),
    developed_by: await getSetting('developed_by', 'TuaansNe'),
  };

  let user: Pick<Account, 'username' | 'is_admin'> | null = null;
  if (session.userId) {
    user = await queryOne<Pick<Account, 'username' | 'is_admin'>>(
      'SELECT username, is_admin FROM account WHERE id = ?',
      [session.userId],
      serverId
    );
  }

  const renderPosts = (posts: Post[]) =>
    posts.map((post) => (
      <a key={post.id} href={`/post/${post.slug}`} className="item-new-box">
        <div className="cat-des">{post.title}</div>
        <div className="date-open" suppressHydrationWarning>{formatDate(post.created_at)}</div>
      </a>
    ));

  return (
    <>

      {/* Hero */}
      <section className="__section game--brand__show __1">
        <div className="bg_video">
          <video id="videoBgPC" className="videobg hidden__mobile" autoPlay muted loop preload="none" playsInline>
            <source src="/assets/frontend/teaser/videos/g.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="limit__game">
          <div className="main--game__show">
            <div className="text--brand t-center m-auto p-relative">
              <HeroLogo src="/assets/frontend/home/v1/images/textgame.png" siteName={siteName} />
            </div>
          </div>
          <div className="box--download jCenter">
            <div className="list-link-dl">
              <a target="_blank" href={iosUrl} rel="noreferrer" className="item-link link-apple">
                <img className="img-ac" src="/assets/frontend/home/v1/images/btn-dl/btn-dl.png" alt="" />
                <img className="img-hv" src="/assets/frontend/home/v1/images/btn-dl/btn-dl-hv.png" alt="" />
              </a>
              <a href={androidUrl} className="item-link link-android">
                <img className="img-ac" src="/assets/frontend/home/v1/images/btn-dl/btn-dl-android.png" alt="" />
                <img className="img-hv" src="/assets/frontend/home/v1/images/btn-dl/btn-dl-android-hv.png" alt="" />
              </a>
              <a target="_blank" href={apkUrl} rel="noreferrer" className="item-link link-android">
                <img className="img-ac" src="/assets/frontend/home/v1/images/btn-dl/btn-dl-apk.png" alt="" />
                <img className="img-hv" src="/assets/frontend/home/v1/images/btn-dl/btn-dl-apk-hv.png" alt="" />
              </a>
              <a target="_blank" href={paymentUrl} rel="noreferrer" className="item-link link-card">
                <img className="img-ac" src="/assets/frontend/home/v1/images/btn-dl/btn-card.png" alt="" />
                <img className="img-hv" src="/assets/frontend/home/v1/images/btn-dl/btn-card-hv.png" alt="" />
              </a>
              <a target="_blank" href={fbUrl} rel="noreferrer" className="item-link link-fb">
                <img className="img-ac" src="/assets/frontend/home/v1/images/btn-dl/btn-fb.png" alt="" />
                <img className="img-hv" src="/assets/frontend/home/v1/images/btn-dl/btn-fb-hv.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <div className="box--content">
        <section className="__section box__new __2 clearfix">
          <div className="tit-frame tCenter">
            <img src="/assets/frontend/home/v1/images/ttsk.png" style={{ width: '60%', maxWidth: 411 }} alt="" />
          </div>
          <div className="limit__game">
            <div className="main--box__new" data-aos="fade-up" data-aos-duration="700" data-aos-delay="400">
              <div className="list-slide box-border p-r">
                <div className="listSlide__new">
                  {slides.map((slide) => (
                    <a key={slide.id} href={slide.link ?? '#'} target="_blank" rel="noreferrer">
                      <img src={slide.image} alt={slide.title} />
                    </a>
                  ))}
                </div>
                <div className="icon-rau rau-left-top"></div>
                <div className="icon-rau rau-right-bottom"></div>
              </div>

              <div className="box-list-new box-border p-r">
                <div className="tab-new clearfix f-utm_facebook">
                  <div className="tab-link custom-border current" data-tab="tab-tin-tuc" data-more="viewtin-tuc">
                    <span>Tin tức</span>
                  </div>
                  <div className="tab-link custom-border" data-tab="tab-su-kien" data-more="viewsu-kien">
                    <span>Sự kiện</span>
                  </div>
                  <div className="tab-link custom-border" data-tab="tab-huong-dan" data-more="viewhuong-dan">
                    <span>Hướng dẫn</span>
                  </div>
                </div>
                <div className="tab-content">
                  <div className="tab-detail current" id="tab-tin-tuc">{renderPosts(tinTuc)}</div>
                  <div className="tab-detail" id="tab-su-kien">{renderPosts(suKien)}</div>
                  <div className="tab-detail" id="tab-huong-dan">{renderPosts(huongDan)}</div>
                </div>
                <div className="view-more">
                  <a href="/tin-tuc" id="viewtin-tuc" className="events a100 link-more current"></a>
                  <a href="/su-kien" id="viewsu-kien" className="events a100 link-more"></a>
                  <a href="/huong-dan" id="viewhuong-dan" className="events a100 link-more"></a>
                </div>
                <div className="icon-rau rau-left-bottom"></div>
                <div className="icon-rau rau-right-top"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <div className="box-link">
          <div className="container">
            <div className="main-box-link">
              <a href={fbGroupUrl} className="item-box-link" data-aos="fade-up" data-aos-duration="700" data-aos-delay="400">
                <img className="img-ac" src="/assets/frontend/home/v1/images/box-link/img-gr.png" alt="" />
                <img className="img-hv" src="/assets/frontend/home/v1/images/box-link/img-gr-hv.png" alt="" />
              </a>
              <a href={fbUrl} className="item-box-link hidden-mobile" data-aos="fade-up" data-aos-duration="700" data-aos-delay="600">
                <img className="img-ac" src="/assets/frontend/home/v1/images/box-link/img-fb.png" alt="" />
                <img className="img-hv" src="/assets/frontend/home/v1/images/box-link/img-fb-hv.png" alt="" />
              </a>
              <a href="/giftcode" className="item-box-link" data-aos="fade-up" data-aos-duration="700" data-aos-delay="800">
                <img className="img-ac" src="/assets/frontend/home/v1/images/box-link/img-gc.png" alt="" />
                <img className="img-hv" src="/assets/frontend/home/v1/images/box-link/img-gc-hv.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Game Features */}
      <section className="__section box_game ftg__sl __3">
        <div className="limit__game">
          <div className="tit-frame tCenter">
            <img src="/assets/frontend/teaser/images/ten_box_game/tit-tinhnang.png" style={{ width: '60%', maxWidth: 411 }} alt="" />
          </div>
          <div className="bg__sl_ft p-r m__inline">
            <img src="/assets/frontend/teaser/images/ftgame/bg-tn.png" style={{ width: '100%' }} alt="" />
            <div className="slide__tinhnang slide__feature p-a slick-custom-dots">
              {[1, 2, 3, 4, 5].map((i) => (
                <img key={i} src={`/assets/frontend/teaser/images/ftgame/teaser${i}.jpg`} alt="" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </>
  );
}
