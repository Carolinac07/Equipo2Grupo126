import { createClient } from "@supabase/supabase-js"

const URL = "https://ibhzhsiqralldclvctzk.supabase.co"
const KEY = "sb_publishable_2yBCU1JCxcVIeyUgOE2vaQ_X1EETYXu"

export const supabase = createClient(URL, KEY)