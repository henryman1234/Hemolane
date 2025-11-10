import type { LoaderFunctionArgs } from "react-router-dom"


const fetchAllBloodBanks = async function (url: string, options: RequestInit = {}) {
    try {

        const res = await fetch(url,  {
            ...options,
            method: "POST",
            headers: {
                ...options.headers,
                "Accept": "application/json; charset=utf-8"
            }
        })

        if (!res.ok) {
            throw new Error("Erreur serveur!")

        }

        const data = await res.json()
        console.log(data)

        return data

        
        
    } catch (err: any) {
        console.log(err?.message)
    }
}




const apiUrl = "http://localhost:8000"

export const listPageLoader = async function ({ request, params }: LoaderFunctionArgs) {
    // const query = request?.url.split("?")[1]
    const url = new URL(request.url)
    const query = url.searchParams.toString()
    const res = await fetchAllBloodBanks(query)
    console.log(query)
    return res
}