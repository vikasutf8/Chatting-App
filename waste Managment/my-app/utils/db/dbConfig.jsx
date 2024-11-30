//postgresql://Project_owner:ZXmG1pg0joDA@ep-wandering-wind-a5tqqgxn.us-east-2.aws.neon.tech/Project?sslmode=require



import {neon} from '@neondatabase/serverless'
import {drizzle} from 'drizzle-orm/neon-http'

import * as schema from './schema'

const sql =neon(process.env.NEON_CONNECTION_STRING)

export const db = drizzle(sql, {schema})
