import { StorageClient } from '@supabase/storage-js'
import { createClient } from '@supabase/supabase-js'

const STORAGE_URL = 'https://cserfwfqoxxsyqezqezy.supabase.co/storage/v1'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzZXJmd2Zxb3h4c3lxZXpxZXp5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NzA2OTA3MSwiZXhwIjoxOTgyNjQ1MDcxfQ.ASUpAw3d5kX2IzfPplCHfSXjIMxSvd4-KHguIWtiaZk' //! service key, not anon key
const SUPABASE_URL = 'https://cserfwfqoxxsyqezqezy.supabase.co'
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzZXJmd2Zxb3h4c3lxZXpxZXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjcwNjkwNzEsImV4cCI6MTk4MjY0NTA3MX0.xjpsIOyZx5FtFLxZheXdSX3_AbEM0t5orMlAT1I_nk0'


export const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
})

export const supabaseClient = createClient(SUPABASE_URL, ANON_KEY)