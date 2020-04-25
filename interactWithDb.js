const { MongoClient } = require('mongodb');

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://Han:cs411@cluster0-x1b1s.mongodb.net/test?retryWrites=true&w=majority";
    //Here you can also replace Han with your name to interact using your own role.
    //e.g "...srv://Dima:cs411@cluster..."

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await  listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("\nDatabases:");
    //print out a list of sample data name.
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    console.log("\nYou have interacted with the database!");
};
