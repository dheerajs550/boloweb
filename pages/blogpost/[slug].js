import React,{useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/BlogPost.module.css'
import * as fs from 'fs';

// step 1: Find the file corresponding to the slug 
// step 2: populate them inside the page
const Slug = (props) => {
  const [blog, setBlog] = useState(props.myBlog);
  console.log(blog,".....slug")
  return (<div className={styles.container}>
    <main className={styles.main}>
    <h1>{blog && blog.title}</h1>
    <hr/>
    <div>
     {blog && blog.content}
    </div>
    </main>
  </div>
  )
};
export async function getStaticPaths() {
 let allb= await fs.promises.readdir(`blogdata`)
 allb= allb.map((item)=>{
  return  { params: { slug: item.split(".")[0]}}

 })
 console.log(allb)

  return {
    paths: allb,
    fallback: true //, false or "blocking" // See the "fallback" section below
  };
}

export async function getStaticProps(context) {
  const {slug} = context.params;   

  
 let myBlog= await fs.promises.readFile(`blogdata/${slug}.json`,'utf-8')

  return {
    props: {myBlog: JSON.parse(myBlog)}, // will be passed to the page component as props
  }
}
export default Slug;