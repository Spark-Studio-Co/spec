import { ArchiveCard } from "../features/archive-card/ui/archive-card"

import { useGetArchive } from "../entities/archive/api/use-get-archive"
import { usePayComission } from "../entities/archive/api/use-pay-comission"
import { useState } from "react"
import { useAuthData } from "../entities/auth-user/api/use-auth-data"

export const ArchiveScreen = () => {
    const [currentCard, setCurrentCard] = useState<number | null>(null)

    const { userId } = useAuthData()
    const { data, isLoading } = useGetArchive()
    const { mutate, isPending: payLoading } = usePayComission()

    const userIdNumber = userId ? Number(userId) : 0

    if (isLoading) return <p className="text-center">Загрузка архива...</p>;


    const handlePayComission = (index: number, commission: number, price_max: number) => {

        setCurrentCard(index);
        const taskId = data[index].id
        const reasonId = 1
        const amount = price_max / commission;

        mutate({
            taskId,
            userId: userIdNumber,
            amount,
            reasonId
        }, {
            onSuccess: () => {
                console.log('Paid comission')
                window.open("https://pay.kaspi.kz/pay/tmdleih3", "_blank");
            },
            onError: (error: any) => {
                console.log(error.message)
            }
        })
    }

    return (
        <div className="flex flex-col gap-y-3  pb-24">
            {data.map((item: any, index: number) => (
                <ArchiveCard
                    isLoading={currentCard === item.id && payLoading}
                    key={index}
                    onClick={() => handlePayComission(index, item.commission, item.price_max)}
                    {...item}
                />
            ))}
        </div>
    )
}
