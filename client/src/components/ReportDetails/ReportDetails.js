import React from 'react'
import { useRouter } from "../../utils/useRouter";

export default function ReportDetails(){
const router = useRouter()
console.log(router.query.id)

    return(<>
    
    all the details go here!

    Make some breadcrumbs!
    </>)
}