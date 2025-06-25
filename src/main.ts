type Person = {
    readonly id: number,
    readonly name: string,
    birth_year: number,
    death_year?: number,
    biography: string,
    image: string
};

type ActressNationality =
    | "American"
    | "British"
    | "Australian"
    | "Israeli-American"
    | "South African"
    | "French"
    | "Indian"
    | "Israeli"
    | "Spanish"
    | "South Korean"
    | "Chinese"

type Actress = Person & {
    most_famous_movies: [string, string, string]
    awards: string
    nationality: "American" | "British" | "Australian" | "Israeli-American" | "South African" | "French" | " Indian" | " Israeli" | "Spanish" | "South Korean" | "Chinese"
}

const isActress = (data: unknown): data is Actress => {
    return (
        typeof data === "object" && data !== null &&
        "id" in data && typeof data.id === "number" &&
        "name" in data && typeof data.name === "string" &&
        "birth_year" in data && typeof data.birth_year === "number" &&
        "death_year" in data && typeof data.death_year === "number" &&
        "biography" in data && typeof data.biography === "string" &&
        "image" in data && typeof data.image === "string" &&
        "most_famous_movies" in data && data.most_famous_movies instanceof Array &&
        "most_famous_movies" in data && data.most_famous_movies.length === 3 &&
        "most_famous_movies" in data && data.most_famous_movies.every(m => typeof m === "string") &&
        "awards" in data && typeof data.awards === "string" &&
        "nationality" in data && typeof data.nationality === "string"
    )

}

const getActress = async (id: number): Promise<Actress | null> => {
    try {
        const response = await fetch(`http://localhost:5000/actresses/${id}`)

        if (!response.ok) {
            throw Error("risposta dal server ko")
        }
        const data: unknown = await response.json()
        if (!isActress(data)) {
            
            throw Error("dati non attinenti")
        }

        return data

    } catch (error) {
        if (error instanceof Error) {
            console.error(error)
        }
        return null
    }
}

(async () =>  console.log(await getActress(3)))()

