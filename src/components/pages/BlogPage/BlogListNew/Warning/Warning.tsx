import React, { useEffect } from 'react'
import * as styles from './Warning.module.css'
import { useGlobalContext } from '../../../../../context/context'



export default function Warning() {
    const { blogRedirectLink, setBlogRedirectLink } = useGlobalContext()

    const clickHandler = () => {
        blogRedirectLink && window.open(blogRedirectLink);
        setBlogRedirectLink(null)
    }

    return (
        <div onClick={(e) => e.stopPropagation()} className={styles.body}>
           <p className={styles.text}>Вы&nbsp;переходите в&nbsp;<span className={styles.emphasized}>Instagram</span> (принадлежит компании Meta, признанной экстремистской организацией, запрещённой на&nbsp;территории&nbsp;РФ)</p> 
           <button className={styles.button} onClick={clickHandler}>OK</button>
        </div>
    )
}
