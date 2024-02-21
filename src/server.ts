import {App} from "./app"
import {UsersController} from "./controllers/users_controller"
import {AuthController} from "./controllers/auth_controller"
import {ProgramsController} from "./controllers/programs_controller"

let app = new App([new UsersController(), new AuthController(), new ProgramsController()], 5000)
app.listen()