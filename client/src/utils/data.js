export const Images = [
    {
        src: "/images/2.jpeg"
    },
    {
        src: "/images/3.jpeg"
    },
    // {
    //     src: "/images/4.jpeg"
    // },
    {
        src: "/images/6.jpeg"
    },
    // {
    //     src: "/images/8.jpeg"
    // }
]

    // type DynamicOject = {
    //     [key: string]: any
    // }

    // const [userData, setUserData] = useState<DynamicOject>({})
    // const [formInputs, setFormInputs] = useState<DynamicOject>({})

    // // On recupère d'abord les données existanstes de l'utilisateur
    // useEffect(function () {

    //     const fetchUser = async function () {
    //         const res = await fetch(`http://localhost:8800/api/users/${id}`, {
    //             method: "GET",
    //             credentials: "include",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json"
    //             }
    //         })
    //         const data = await res.json()
    //         setUserData(data)
    //         setFormInputs(data)
    //         console.log(data)
    //     }
        
    //     fetchUser()

    // }, [id])

    // // gère les changements dans le formulaire
    // const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    //     setFormInputs(function (prev){
    //         return {...prev,  [e.target.name]: e.target.value}
    //     })
    // } 

    
        // const dataToUpdate = Object.keys(formInputs).reduce(function (acc: DynamicOject, key){

        //     if (formInputs[key] !== userData[key] && formInputs[key] !==  "") {
        //         acc[key] =  formInputs[key]
        //     }
        //     return acc;
        // }, {})




// const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {

//     const formData = new FormData(e.currentTarget);

// // convertit en objet JS (attention aux File si tu en as)
// const payload = Object.fromEntries(
// [...formData.entries()].map(([k, v]) => [k, v instanceof File ? undefined : String(v)])
// );

// // si certains champs sont undefined à cause des File, tu peux les filtrer:
// const cleaned = Object.entries(payload).reduce((acc, [k,v]) => {
// if (v !== undefined && v !== "") acc[k] = v;
// return acc;
// }, {} as Record<string,string>);

// const res = await fetch(`http://localhost:8800/api/users/${id}`, {
// method: "PUT", // ou PATCH si tu fais une MAJ partielle
// headers: {
// "Content-Type": "application/json",
// Accept: "application/json"
// },
// credentials: "include",
// body: JSON.stringify(cleaned)
// });

// if (res.ok) {
// const data = await res.json();
//             window.localStorage.setItem("user", JSON.stringify(data))
//             // const parse = JSON.parse
//             // updateUser(data)
//             navigate("/profile")
//             window.location.reload()
// }

// }