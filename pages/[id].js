import Head from 'next/head'
import Image from 'next/image'
import {supabase} from "../utils/supabase"

let allLessons = []


const LessonDetails = ({lesson}) => {
   return  <div className='w-full max-w-3xl mx-auto my-16 px-2'>
        <h1 className='text-3xl mb-6'>
          {lesson.title}
        </h1>
        <p>
            {lesson.description}
        </p>
    </div>

}

export const getStaticPaths = async () => {
    const {data: lessons} = await supabase.from("lesson").select("*");
    allLessons = lessons;
    const paths = lessons.map(lesson => (
        {
            params: {
                id: lesson.id.toString()
            }
        }
    ))
    return {
      paths,
      fallback: false
    }
  }
  

export const getStaticProps = async ({params: {id} }) => {
   const {data: lesson} = await supabase.from("lesson").select("*").eq("id", id).single() 
  //console.log(allLessons)
  //const lesson = allLessons.find(({ id }) => id.toString() === params.id)
  return {
    props: {
      lesson
    }
  }
}

export default LessonDetails;
