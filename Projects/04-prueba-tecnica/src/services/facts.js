const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

//por lo gral en las entrevistas te prohiben usar react Query, axios, apollo, SWR y tienes que usar fetch
export const getRandomFact = async () => {
    const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
    const data = await res.json()
    const { fact } = data
    return fact
}