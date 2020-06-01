import { openDatabase } from 'react-native-sqlite-storage'
let db = openDatabase({ name: 'AleksDatabase.db' });

export class DB {
    static init() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, first_name TEXT NOT NULL, profile_image TEXT, updated_at TEXT, liked_by_user INT )',
                    [],
                    resolve,
                    (_, error) => reject(console.log('QQQ error', error))
                );
            });
        })
    }
    static getUsers() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM users',
                    [],
                    (_, result) => resolve(result.rows.length),
                    (_, error) => reject(console.log('QQQ error', error))
                );
            });
        })
    }

    static createUsers({first_name, updated_at, profile_image}) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO users (first_name, updated_at, liked_by_user, profile_image) VALUES(?, ?, ?, ?)`,
                    [first_name, updated_at, 0, profile_image],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(console.log('QQQ error', error))
                );
            });
            console.log('AAA createUsers resolve ', resolve)
        })
    }
    static updateUser(user) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE users SET liked_by_user = ? WHERE id = ? ',
                    [user.liked_by_user ? 0 : 1, user.id],
                    resolve,
                    (_, error) => reject(console.log('QQQ error', error))
                );
            });
        })
    }
    static removeUser(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM users WHERE id = ?',
                    [id],
                    resolve,
                    (_, error) => reject(console.log('QQQ error', error))
                );
            });
        })
    }

}





// try {
//     DB.init();
//     console.log('DataBase start...')
// } catch (e) {
//     console.log('Error', e)
// }

