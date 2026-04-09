import { notFound } from 'next/navigation';
import { query, queryOne } from '@/lib/db';
import { getSession } from '@/lib/session';
import { Post } from '@/lib/types';
import { formatDatetime } from '@/lib/utils';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const session = await getSession();
  const serverId = session.serverId ?? 1;

  const post = await queryOne<Post>(
    `SELECT p.*, c.name as category_name, c.slug as category_slug
     FROM posts p
     JOIN categories c ON p.category_id = c.id
     WHERE p.slug = ? AND p.status = 'published'`,
    [slug], serverId
  );

  if (!post) notFound();

  // Increment views (fire and forget)
  queryOne('UPDATE posts SET views = views + 1 WHERE id = ?', [post.id], serverId).catch(() => {});

  const related = await query<Post>(
    `SELECT * FROM posts WHERE category_id = ? AND id != ? AND status = 'published' ORDER BY created_at DESC LIMIT 5`,
    [post.category_id, post.id], serverId
  );

  const imageUrl = post.featured_image
    ? (post.featured_image.startsWith('/') ? post.featured_image : `/${post.featured_image}`)
    : null;

  return (
    <div className="main-content">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Trang chủ</Link> &gt;{' '}
          <Link href={`/${post.category_slug}`}>{post.category_name}</Link> &gt;{' '}
          <span>{post.title}</span>
        </div>

        <article className="post-detail">
          <header className="post-header">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <span className="post-category">
                <Link href={`/${post.category_slug}`}>{post.category_name}</Link>
              </span>
              <span className="post-date">{formatDatetime(post.created_at)}</span>
              <span className="post-views">{Number(post.views).toLocaleString('vi-VN')} lượt xem</span>
            </div>
          </header>

          {imageUrl && (
            <div className="post-featured-image">
              <img src={imageUrl} alt={post.title} />
            </div>
          )}

          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="post-actions">
            <div className="social-share">
              <span>Chia sẻ:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(process.env.NEXT_PUBLIC_SITE_URL + '/post/' + slug)}`}
                target="_blank" rel="noreferrer" className="share-facebook"
              >Facebook</a>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <div className="related-posts">
            <h3>Bài viết liên quan</h3>
            <div className="related-posts-grid">
              {related.map((r) => {
                const rImg = r.featured_image ? (r.featured_image.startsWith('/') ? r.featured_image : `/${r.featured_image}`) : null;
                return (
                  <div key={r.id} className="related-post-item">
                    {rImg && (
                      <div className="related-post-image">
                        <Link href={`/post/${r.slug}`}>
                          <img src={rImg} alt={r.title} />
                        </Link>
                      </div>
                    )}
                    <div className="related-post-content">
                      <h4 className="related-post-title">
                        <Link href={`/post/${r.slug}`}>{r.title}</Link>
                      </h4>
                      <div className="related-post-meta">
                        <span>{formatDatetime(r.created_at)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
