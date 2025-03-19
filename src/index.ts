import {SETTINGS} from "./settings";
import {app} from "./app";
import {runDb} from "./db/mongodb";


const startApp = async () => {
    await runDb()
    app.listen(SETTINGS.PORT, () => {
        console.log(`Server worked on port ${SETTINGS.PORT}`)
    })
}

startApp()