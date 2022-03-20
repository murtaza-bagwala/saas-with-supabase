import { supabase } from "../utils/supabase"
import { useEffect } from "react"
import Router from "next/router";
import { useUser } from "../context/user"

export default function Logout () {
  const {logout}  = useUser();    
  useEffect(logout, []);

  return <p> Logging out</p>
}