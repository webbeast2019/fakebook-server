const fs = require('fs');
const fileName = './data/db.json';
const dbString = fs.readFileSync(fileName, 'utf8');
let db = JSON.parse(dbString);
let nextEntryId = Math.max(...db.map(item => item.id)) + 1; // get max id;
exports.data = db;

exports.getNextEntryId = () => nextEntryId;

exports.createEntry = (data) =>{
    const entry = {...data, id: nextEntryId};
    db.push(entry);
    saveToDisk();
    nextEntryId++;
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
