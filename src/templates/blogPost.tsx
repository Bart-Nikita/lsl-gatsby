import React from 'react'
import Seo from '../components/seo/Seo'
import Online from '../components/common/Online/Online'
import BlogPostContent from '../components/pages/BlogPostPage/BlogPostContent/BlogPostContent'
import BlogPostHero from '../components/pages/BlogPostPage/BlogPostHero/BlogPostHero'
import BlogPostMedia from '../components/pages/BlogPostPage/BlogPostMedia/BlogPostMedia'
import BlogPostMore from '../components/pages/BlogPostPage/BlogPostMore/BlogPostMore'
import { GlobalContext, globalState } from '../context/context'
import Layout from '../components/layout/Layout'

export const Head = (data: BlogPostProps) => {
  console.log(data.pageContext.site.siteMetadata?.url)
  return (
    <Seo url={data.pageContext.site.siteMetadata?.url || ''} title={('LSL | ' + data.pageContext.post.blog?.blogPostHeroZagolovok) || ''} description={data.pageContext.post.blog?.blogPostHeroKratkoeOpisanie || ''}></Seo>)
}

export type BlogPostProps = {
  pageContext: {
    menuItems: Queries.WpMenuItem[],
    post: Queries.WpBlog,
    allPosts: Queries.WpBlog[],
    commonSections: Queries.WpCommonSection[],
    slug: string,
    site: Queries.Site,
    allFiles: Queries.File[],
  }
}


export default function blogPost(data: BlogPostProps ) {
  //@ts-ignore
  const state = globalState(data)
  return <GlobalContext.Provider value={state}>
    <Layout>
      <BlogPostHero></BlogPostHero>
      <BlogPostContent></BlogPostContent>
      <BlogPostMedia></BlogPostMedia>
      <BlogPostMore></BlogPostMore>
      <Online className={'hidden xl:block'}></Online>
    </Layout>
  </GlobalContext.Provider>
}
