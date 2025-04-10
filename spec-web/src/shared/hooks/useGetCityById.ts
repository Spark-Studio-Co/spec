import { useGetCities } from "../../entities/cities/api/use-get-cities"

export const useGetCityById = (cityId?: number) => {
    const { data: cities } = useGetCities()

    const city = cities?.find((city: any) => city.id === cityId)

    console.log("Найденный город:", city)

    return { name: city?.name ?? "Город не найден" }
}