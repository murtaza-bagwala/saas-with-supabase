import { supabase } from "../utils/supabase"
import { useEffect } from "react"
import Router from "next/router";

export default function Logout () {
 useEffect(() => {
    const logout = async () => {
        await supabase.auth.signOut();
        Router.push("/")
    }
    logout();
 }, []);

 return <p> Logging out</p>
}