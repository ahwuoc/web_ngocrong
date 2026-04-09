const mysql = require('mysql2/promise');

async function seedDB() {
  const dbConfig = {
    host: 'ngocrongmup.online',
    user: 'ahwuocdz',
    password: '123456',
    database: 'nro_v1',
  };

  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to DB');

    // Insert Slides
    const slides = [
      ['Chào mừng đến với Ngọc Rồng Siêu Cấp', '/assets/frontend/teaser/images/ftgame/teaser1.jpg', '#', 'active', 1],
      ['Sự kiện đua top máy chủ mới', '/assets/frontend/teaser/images/ftgame/teaser2.jpg', '#', 'active', 2],
      ['Hướng dẫn tân thủ nhận quà', '/assets/frontend/teaser/images/ftgame/teaser3.jpg', '#', 'active', 3],
    ];
    
    for (const slide of slides) {
        await connection.execute(
            'INSERT INTO slides (title, image, link, status, sort_order) VALUES (?, ?, ?, ?, ?)',
            slide
        );
    }
    console.log('Inserted 3 sample slides');

    // Insert Posts
    // Need category IDs. Category list: 1=Tin tức, 2=Sự kiện, 3=Hướng dẫn
    const posts = [
      ['Thông báo bảo trì định kỳ', 'thong-bao-bao-tri', 'Nội dung tin tức bảo trì...', 1, 1, 'published', new Date()],
      ['Khai mở máy chủ mới S1', 'khai-mo-may-chu', 'Nội dung khai mở máy chủ...', 2, 1, 'published', new Date()],
      ['Hướng dẫn nạp thẻ qua ATM', 'huong-dan-nap-the', 'Nội dung hướng dẫn nạp thẻ...', 3, 1, 'published', new Date()],
    ];

    for (const post of posts) {
        await connection.execute(
            'INSERT INTO posts (title, slug, content, category_id, author_id, status, published_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            post
        );
    }
    console.log('Inserted 3 sample posts');

    await connection.end();
  } catch (err) {
    console.error('Error seeding DB:', err);
  }
}

seedDB();
