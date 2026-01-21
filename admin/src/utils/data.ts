

export const menu = [
    {
        id: 1,
        title: "pricipale",
        listItems: [
            {
                id: 1,
                url: "/",
                title: "Acceuil",
                icon: "/images/home.svg"
            },
            {
                id: 2,
                url: "/profile",
                title: "Profile",
                icon: "/images/user.svg"
            },
           
        ]
    },
    {
        id: 2,
        title: "produits",
        listItems: [
            {
                id: 1,
                url: "/hospitals",
                title: "Hopitaux",
                icon: "/images/user.svg"
            },
            {
                id: 2,
                url: "/bloodBanks",
                title: "Banques de sangs",
                icon: "/images/product.svg"
            },
            {
                id: 3,
                url: "/reservations",
                title: "Reservations",
                icon: "/images/order.svg"
            },
            {
                id: 4,
                url: "/users",
                title: "Utilisateurs",
                icon: "/images/user.svg"
            },
        ]
    },
    {
        id: 3,
        title: "generales",
        listItems: [
            {
                id: 2,
                title: "Créer un hopital",
                icon: "/images/note.svg",
                url: "/createHospital"
            },
            {
                id: 1,
                url: "/notifications",
                title: "Page de notification",
                icon: "/images/element.svg"
            },
            {
                id: 3,
                title: "Formulaires",
                icon: "/images/form.svg",
                url: "/"
            }
        ]
    },
    {
        id: 4,
        title: "Maintenance",
        listItems: [
            {
                id: 1,
                title: "Paramètres",
                icon: "/images/setting.svg",
                url: "/"
            }
        ]
    },
    {
        id: 5,
        title: "analytics",
        listItems: [
            {
                id: 1,
                title: "Graphiques",
                icon: "/images/chart.svg",
                url: "/"
            }
        ]
    },
    {
        id: 6,
        title: "Déconnexion",
        listItems: [
            {
                id: 1,
                title: "Se déconnecter",
                icon: "/images/logout.svg",
                url: "/login"
            }
        ]
    }
]