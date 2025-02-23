

import { ArchiveCard } from "../features/archive-card/ui/archive-card"

export const ArchiveScreen = () => {
    const archiveItems = [
        {
            title: 'Установка смесителя',
            description: 'Нужно установить смеситель, вся подводка имеется',
            price: '7 000 – 10 000₸',
            comission: '1000₸',
            phone: '+7 777 777 77 77',
            date: 'Сегодня, 18:00',
            address: 'Жуковского, дом. 119',
            status: 'Выполнен',
            isPaid: true
        },
        {
            title: 'Установка смесителя',
            description: 'Нужно установить смеситель, вся подводка имеется',
            price: '10 000₸',
            comission: 'Комиссия 1000₸',
            phone: '+7 777 777 77 77',
            date: 'Сегодня, 18:00',
            address: 'Жуковского, дом. 119',
            status: 'Возврат',
            comment: 'Клиент хочет через 3 часа, я не могу'
        }
    ]

    return (
        <div className="flex flex-col gap-y-3  pb-24">
            {archiveItems.map((item, index) => (
                <ArchiveCard
                    key={index}
                    {...item}
                />
            ))}
        </div>
    )
}
