import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'
const supabaseUrl = 'https://vedvfiegcwglqwqpiflm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZHZmaWVnY3dnbHF3cXBpZmxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1NTA2NjYsImV4cCI6MTk5MDEyNjY2Nn0.dmmXzo6HIFMHvrAtqUWjDzmVm2_RqWhlb85suS8rBs0'
export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})