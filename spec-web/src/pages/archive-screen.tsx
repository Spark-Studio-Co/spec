import { ArchiveCard } from "../features/archive-card/ui/archive-card"

import { useGetArchive } from "../entities/archive/api/use-get-archive"

export const ArchiveScreen = () => {

    const { data, isLoading } = useGetArchive()

    if (isLoading) return <p className="text-center">Загрузка архива...</p>;

    return (
        <div className="flex flex-col gap-y-3  pb-24">
            {data.map((item: any, index: number) => (
                <ArchiveCard
                    key={index}
                    {...item}
                />
            ))}
        </div>
    )
}
