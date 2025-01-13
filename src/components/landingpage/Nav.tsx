"use client"

import { useRouter } from "next/navigation"

export default function Nav(){
    const router = useRouter()

    const routeLogin = ()=>{
        router.push("/login")
    }

    return(
        <>
            <div className="mt-6 w-3/4 m-auto">
                <div className="flex justify-between">
                    <div>
                        <h1>FROZEN 24</h1>
                    </div>
                    <div className="flex justify-evenly">
                        <button onClick={routeLogin}>Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}