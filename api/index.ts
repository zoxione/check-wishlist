import { StorageClient } from '@supabase/storage-js'

const STORAGE_URL = 'https://cserfwfqoxxsyqezqezy.supabase.co/storage/v1'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzZXJmd2Zxb3h4c3lxZXpxZXp5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NzA2OTA3MSwiZXhwIjoxOTgyNjQ1MDcxfQ.ASUpAw3d5kX2IzfPplCHfSXjIMxSvd4-KHguIWtiaZk' //! service key, not anon key

export const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
})