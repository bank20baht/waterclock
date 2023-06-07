import SQLite from 'react-native-sqlite-storage';

export const openDatabase = () => {
  const db = SQLite.openDatabase(
    {
      name: 'test2.db',
      location: 'default',
    },
    () => {
      console.log('Database opened successfully');
    },
    error => {
      console.error('Failed to open database: ', error);
    },
  );

  return db;
};

export const createTable = (db: any) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS watertrack (id INTEGER PRIMARY KEY AUTOINCREMENT, amount INTEGER, date TEXT, status INTEGER, time TEXT)`,
      [],
      () => {
        console.log('Table created successfully');
      },
      (error: any) => {
        console.error('Failed to create table: ', error);
      },
    );
  });

  db.transaction((tx: any) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS timesetalert (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, time TEXT)`,
      [],
      () => {
        console.log('Table time alert created successfully');
      },
      (error: any) => {
        console.error('Failed to create time alert table: ', error);
      },
    );
  });
};
