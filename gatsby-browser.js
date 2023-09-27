import "./src/styles/global.css"
import { GlobalContextLay } from './src/components/common/Context'
import Layout from './src/components/layout/Layout'

import React from "react"

export const wrapRootElement = ({ element }) => (
    <GlobalContextLay>
        <Layout>
            {element}
        </Layout>
    </GlobalContextLay>
)