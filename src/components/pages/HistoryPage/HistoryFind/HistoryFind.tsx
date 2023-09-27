import React from 'react';
import styles from './HistoryFind.module.css'
import {stack} from "../../../../hooks/useClassName";
import {useGlobalContext} from "../../../../context/context";
import {Link} from "react-router-dom";

const HistoryFind = () => {
    const {historyPage} = useGlobalContext()

    return (
        <div className={stack('container-new', 'section-mb', styles.body)}>
            <div className={styles.content}>
                <h2 className={stack('text-large', styles.title)}>{historyPage?.history.historyFindTrainingTekst}</h2>
                <Link to={historyPage?.history.historyFindTrainingAdresSsylki}
                      dangerouslySetInnerHTML={{__html: historyPage?.history.historyFindTrainingTekstSsylki}}
                      className={stack('button-secondary-new', 'link', styles.link)}></Link>
            </div>
        </div>
    );
};

export default HistoryFind;