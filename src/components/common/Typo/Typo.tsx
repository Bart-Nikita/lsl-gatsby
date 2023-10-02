import React from 'react'
import { typo } from '../../../tipograf'

type TypoProps = {
    children: string
}

export default function Typo({children} : TypoProps) {
  return typo.execute(children)
}
