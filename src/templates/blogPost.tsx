import React from 'react'
import Seo from '../components/seo/Seo'

export const Head = (data: {pageContext: {post : Queries.WpBlog}}) => {
console.log(data.pageContext)
  return (
<Seo url={data.pageContext.url || ''} title={('LSL | ' +data.pageContext.post.blog?.blogPostHeroZagolovok) || ''} description={data.pageContext.post.blog?.blogPostHeroKratkoeOpisanie || ''}></Seo>  )
}


export default function blogPost({pageContext}: {pageContext: {post : Post}}) {
  return (
    <div>{pageContext?.post?.blog?.blogPostHeroZagolovok}</div>
  )
}
