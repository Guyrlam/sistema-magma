const electron = require('electron');

const { app } = electron;
const { BrowserWindow } = electron;
const path = require('path');
const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');

let mainWindow;

// quando compilar remover a public
const db = new sqlite3.Database('./public/db.db', (err) => {
    if (err) console.error('Database opening error: ', err);
});

const users_table = "Users"

db.serialize(() => {
    db.get(
        `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
        [users_table],
        (err, row) => {
            if (!row) {
                db.run(
                    `CREATE TABLE "Users" (
                        "id"	INTEGER UNIQUE,
                        "name"	TEXT,
                        "password"	TEXT,
                        "register"	INTEGER,
                        "permission" INTEGER,
                        PRIMARY KEY("id" AUTOINCREMENT)
                    );
               `, (err) => {
                    !err && db.run(`INSERT INTO "Users" ("name", "password", "register", "permission") VALUES ("Hugo", "1234", 0, "adm");`)
                });
            }
        }
    );
});

ipcMain.on('asynchronous-message', (event, arg) => {
    const sql = arg;
    db.all(sql, (err, rows) => {
        event.reply('asynchronous-reply', (err && err.message) || rows);
    });
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900, height: 680, webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        preload: path.join(__dirname, 'src/message-control'),
        icon: path.join(__dirname, "./magna.ico")
    });
    mainWindow.loadURL(
        //quando compilar colocar `file://${path.join(__dirname, "../build/index.html")}`
        "http://localhost:3000"
    );
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});