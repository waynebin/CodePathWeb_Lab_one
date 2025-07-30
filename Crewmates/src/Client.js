import React from 'react';
import {createClient} from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.VITE_supabase_url 
const API_KEY = import.meta.env.VITE_supabase_key
const supabase = createClient(supabaseUrl, API_KEY);

export default supabase;