import express, { Router } from "express";

export class ServerApp {
    constructor(
        public port: number,
        public routes: Router
    ) { }

    public start() {
        const server = express()

        server.use(express.json());
        server.use('/api', this.routes)

        server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`)
        })
    }
}