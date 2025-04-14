import { ArchiveCard } from "../features/archive-card/ui/archive-card"

import { useGetArchive } from "../entities/archive/api/use-get-archive"
import { useState } from "react"

export const ArchiveScreen = () => {
    const [currentCard, setCurrentCard] = useState<number | null>(null)

    const { data, isLoading } = useGetArchive()

    if (isLoading) return <p className="text-center">Загрузка архива...</p>;


    const handleKaspiRedirect = (index: number) => {
        console.log(currentCard)
        setCurrentCard(index);
        window.open("https://pay.kaspi.kz/pay/tmdleih3", "_blank");
    }

    return (
        <div className="flex flex-col gap-y-3  pb-24">
            {data?.map((item: any, index: number) => (
                <ArchiveCard
                    title={item?.categories?.name || 'Без названия'}
                    key={index}
                    onClick={() => handleKaspiRedirect(index)}
                    {...item}
                />
            ))}
        </div>
    )
}
