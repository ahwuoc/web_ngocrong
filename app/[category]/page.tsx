import { notFound } from 'next/navigation';
import { query, queryOne } from '@/lib/db';
import { getSetting } from '@/lib/settings';
import { getSession } from '@/lib/session';
import { Post, Category } from '@/lib/types';
import Link from 'next/link';

const KNOWN_CATEGORIES = ['tin-tuc', 'su-kien', 'huong-dan'];
const PER_PAGE = 10;

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category: slug } = await params;
  const { page: pageStr } = await searchParams;

  // Avoid catching other dynamic routes
  if (!KNOWN_CATEGORIES.includes(slug)) notFound();

  const session = await getSession();
  const serverId = session.serverId ?? 1;

  const category = await queryOne<Category>(
    "SELECT * FROM categories WHERE slug = ? AND status = 'active'",
    [slug], serverId
  );
  if (!category) notFound();

  const page = Math.max(1, Number(pageStr ?? 1));
  const offset = (page - 1) * PER_PAGE;

  const [countResult, posts] = await Promise.all([
    queryOne<{ total: number }>(
      "SELECT COUNT(*) as total FROM posts WHERE category_id = ? AND status = 'published'",
      [category.id], serverId
    ),
    query<Post>(
      "SELECT * FROM posts WHERE category_id = ? AND status = 'published' ORDER BY published_at DESC LIMIT ? OFFSET ?",
      [category.id, PER_PAGE, offset], serverId
    ),
  ]);

  const totalPages = Math.ceil((countResult?.total ?? 0) / PER_PAGE);
  const siteName = await getSetting('site_name');

  return (
    <div className="main-content">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Trang chủ</Link> &gt; <span>{category.name}</span>
        </div>

        <div className="category-header">
          <h1>{category.name}</h1>
          {category.description && <p className="category-description">{category.description}</p>}
        </div>

        <div className={`posts-grid${posts.length === 0 ? ' empty-grid' : ''}`}>
          {posts.length === 0 ? (
            <div className="no-posts"><p>Chưa có bài viết nào trong danh mục này.</p></div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="post-item">
                <div className="post-image">
                  <Link href={`/post/${post.slug}`}>
                    <img
                      src={post.featured_image || '/assets/images/default-thumbnail.jpg'}
                      alt={post.title}
                    />
                  </Link>
                </div>
                <div className="post-content">
                  <h2 className="post-title">
                    <Link href={`/post/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <div className="post-meta">
                    <span className="post-author">đăng bởi TuaansNe</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            {page > 1 && (
              <Link href={`/${slug}/page/${page - 1}`} className="page-link">&laquo; Trang trước</Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
              i === page
                ? <span key={i} className="page-link current">{i}</span>
                : <Link key={i} href={`/${slug}/page/${i}`} className="page-link">{i}</Link>
            ))}
            {page < totalPages && (
              <Link href={`/${slug}/page/${page + 1}`} className="page-link">Trang sau &raquo;</Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
