import * as express from "express"
import * as bodyParser from "body-parser"

class App{
	app
	port
	constructor(controllers: any[], port: number){
		this.app = express()
		this.port = port
		this.initMiddlewares()
		this.initControllers(controllers)
	}

	initControllers(controllers:any[]){
		for(let i=0; i<controllers.length; i++){
			this.app.use("/", controllers[i].router)
		}
	}

	initMiddlewares(){
		this.app.use(bodyParser.json())
	}

	listen(){
		this.app.listen(this.port, ()=>{
			console.log(`server works on port ${this.port}`)
		})
	}
}

export {App}