import React from 'react';
import * as styles from './HistoryFind.module.css'
import {stack} from "../../../../hooks/useClassName";
import {useGlobalContext} from "../../../../context/context";
import {Link} from "gatsby";

const HistoryFind = () => {
    const {historyPage} = useGlobalContext()

    return (
        <div className={stack('container-new', 'section-mb', styles.body)}>
            <div className={styles.content}>
                <h2 className={stack('text-large', styles.title)}>{historyPage?.wpPage?.history?.historyFindTrainingTekst || ''}</h2>
                <Link to={historyPage?.wpPage?.history?.historyFindTrainingAdresSsylki || ''}
                      dangerouslySetInnerHTML={{__html: historyPage?.wpPage?.history?.historyFindTrainingTekstSsylki || ''}}
                      className={stack('button-secondary-new', 'link', styles.link)}></Link>
            </div>
        </div>
    );
};

export default HistoryFind;