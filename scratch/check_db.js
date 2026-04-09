const mysql = require('mysql2/promise');

async function checkDB() {
  const dbConfig = {
    host: 'ngocrongmup.online',
    user: 'ahwuocdz',
    password: '123456',
    database: 'nro_v1',
  };

  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to DB');

    const [slides] = await connection.execute('SELECT * FROM slides');
    console.log('Slides count:', slides.length);
    console.log('Slides:', slides);

    const [posts] = await connection.execute('SELECT * FROM posts');
    console.log('Posts count:', posts.length);

    const [cats] = await connection.execute('SELECT * FROM categories');
    console.log('Categories:', cats);
    
    if (cats.length > 0) {
        for (const cat of cats) {
            const [p] = await connection.execute('SELECT count(*) as count FROM posts WHERE category_id = ?', [cat.id]);
            console.log(`Posts in category ${cat.name} (${cat.slug}):`, p[0].count);
        }
    }

    await connection.end();
  } catch (err) {
    console.error('Error connecting to DB:', err);
  }
}

checkDB();
