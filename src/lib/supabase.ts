import { StorageClient } from '@supabase/storage-js'
import { SUPABASE_SERVICE_KEY, SUPABASE_STORAGE_URL } from '../data/constants'

export const storageClient = new StorageClient(SUPABASE_STORAGE_URL, {
  apikey: SUPABASE_SERVICE_KEY,
  Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
})
