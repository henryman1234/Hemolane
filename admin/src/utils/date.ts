
export const formatDate = function (date: string) {
    return new Date(date).toLocaleTimeString("fr-FR", {
        month: "long",
        day: "numeric",
        year: "numeric"
    })
}