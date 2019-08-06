const fs = require('fs');
const fileName = './data/db.json';
const dbString = fs.readFileSync(fileName, 'utf8');
let db = JSON.parse(dbString);
let entryCounter = Math.max(...db.map(item => item.id)); // get max id;
exports.data = db;

exports.createEntry = (data) =>{
    entryCounter++;
    const entry = {...data, id: entryCounter};
    db.push(entry);
    saveToDisk();
    return entry;
};

// return entry if found
exports.updateEntry = (id, data) => {
    const index = db.findIndex(p => p.id === id);
    const entryFound = index > -1;
    if(entryFound) {
        db[index] = data;
        saveToDisk();
    }
    return (entryFound) ? db[index] : undefined;
};

// return true if entry found
exports.deleteEntry = (id) => {
    const originalLength = db.length;
    exports.data = db = db.filter(p => p.id !== id);

    const entryFound = originalLength !== db.length;
    if(entryFound) {
        saveToDisk();
    }
    return entryFound;
};

function saveToDisk() {
    fs.writeFile(fileName, JSON.stringify(db, null, 2), (err) => {
        if (err) {
            console.error(err.message);
            throw err;
        }
    });
}
