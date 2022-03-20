import { supabase } from "../utils/supabase"
import { useEffect } from "react"

export default function Login () {
 useEffect(() => {
    supabase.auth.signIn({
      provider: "github"
    });
 }, []);

 return <p> Logging in</p>
}