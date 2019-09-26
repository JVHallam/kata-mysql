import DEF from "../index.js";
const sqlite3 = require('sqlite3').verbose();

async function dbFromJson( json ){
  const db = new sqlite3.Database(":memory:"); 
  
  db.serialize(() => {
    const tables = Object.keys( json );

    for( var i = 0; i < tables.length; ++i ){
      const name = tables[0];
      //db.run("CREATE TABLE lorem (info TEXT)");
      const createQuery = `CREATE TABLE ${name} lorem;`
      //db.run( createQuery );
      const columns = json[name].columns;
      const columnQuery = columns.reduce( ( a, x ) => `${a}, ${x}`);
      console.log( columnQuery );

      const tableData = json[name].rows.reduce( ( a, x ) => `${a}, ${x}` );
      console.log( tableData );
    }




/*

      var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
      for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
      }

      stmt.finalize();
      resolve();
      */

  });

  return db;
}

describe("This is an example", () => {
  it("This is a test!", async () => {
    const { balls } = DEF;
    const db = await dbFromJson( require("./databases/example.json") );
    db.close();
  });
});
