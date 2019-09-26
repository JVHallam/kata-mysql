import DEF from "../index.js";
const sqlite3 = require('sqlite3').verbose();
 
async function setup( db ){
  await new Promise(( resolve, reject ) => {
    db.serialize(() => {
      db.run("CREATE TABLE lorem (info TEXT)");
      var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
      for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
      }
      stmt.finalize();
      resolve();
    });
  });
}

describe("This is an example", () => {
  it("This is a test!", async () => {
    const { balls } = DEF;
    console.log( balls );

    const db = new sqlite3.Database(":memory:");
    await setup( db );
    
    const result = await new Promise(( resolve, reject ) => {
      db.all("SELECT * from lorem", ( err, rows ) => {
        resolve(rows);
      });
    });

    console.log( result );

    db.close();
  });
});
