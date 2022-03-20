import Head from 'next/head'
import Image from 'next/image'
import {supabase} from "../utils/supabase"

export default function Home({lessons}) {
  console.log("**********", lessons)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {
       lessons.map(lesson => (
          <><p>
           {lesson.title}
          </p><p>
            {lesson.description}
          </p></>
       ))
      }
    </div>
  )
}

export const getStaticProps = async () => {
  console.log("**********")
  const {data: lessons} = await supabase.from("lesson").select("*");
  return {
    props: {
      lessons
    }
  }
}
