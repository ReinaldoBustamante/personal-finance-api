import { AppRoutes } from "./presentation/routes/routes"
import { ServerApp } from "./presentation/server"


const app = () => {
    const server = new ServerApp(3000, AppRoutes.router())
    server.start()
}

(() => {
    app()
})()