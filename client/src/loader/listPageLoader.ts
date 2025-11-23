import type { LoaderFunctionArgs } from "react-router-dom"


const fetchAllBloodBanks = async function (query: string, options: RequestInit = {}) {
    try {
        const apiUrl = "https://hemolane-backend.onrender.com"
        // const apiUrl = "http://localhost:8000"

         // Construire l'URL complète avec les paramètres
        const url = `${apiUrl}/api/bloodBanks${query ? `?${query}` : ""}`;

        const res = await fetch(url,  {
            ...options,
            method: "GET",
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

        return data?.data

    } catch (err: any) {
        console.log(err?.message)
    }
}



export const listPageLoader = async function ({ request, params }: LoaderFunctionArgs) {
    // const query = request?.url.split("?")[1]
    const url = new URL(request.url)

    const query = url.searchParams.toString()
    console.log(query)
    const res = await fetchAllBloodBanks(query)


    return res 
}