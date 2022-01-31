let express = require('express');
const apiRouter = require("./api.router.js")
let app = express();
const path = require("path")
const {runDB} = require("./service/index.js")
const urlencodedParser = express.urlencoded({extended: false});
app.use(urlencodedParser)
app.use(express.json())
app.use(express.static(path.join(process.cwd(), "public")))


let cors = require('cors')
app.use(cors({
    origin: true,
    credentials: true
}));


app.use('/', apiRouter)

async function run(){
    await runDB()
    app.listen(5000, () => {
        console.log("run");
    })
}

run()



