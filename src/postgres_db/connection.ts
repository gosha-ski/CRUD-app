import {Pool, Client} from "pg"

const pool = new Pool({
  user: "postgres_user",
  host: 'localhost',
  database: 'first_test_db',
  password: 'kadet0400',
  port: 5432,
})


export {pool}
