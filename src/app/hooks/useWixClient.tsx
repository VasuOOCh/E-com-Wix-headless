'use client'

import { useContext } from "react"
import { wixClientContext } from "../context/wixContext"

export const useWixClient = () => {
    return useContext(wixClientContext)
}