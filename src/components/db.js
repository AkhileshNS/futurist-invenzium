import Dexie from 'dexie';

const db = new Dexie('ReactSampleDB');
db.version(1).stores({ posts: '++id,title,subtext' });

export default db;