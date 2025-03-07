import { ArchiveCard } from "../features/archive-card/ui/archive-card";

export const AdminArchiveScreen = () => {
    const applications = [
        {
            id: 1,
            title: 'Двухкомнатная квартира',
            description: 'Требуется оценка двухкомнатной квартиры в центре города',
            price: 25000,
            commission: 5000,
            phone: '+7 (777) 123-45-67',
            date: '2024-03-06',
            address: 'ул. Абая 123, кв. 45',
            status_id: 3, // completed
            performer: 'Турсунбаев Ержан Кайратович'
        },
        {
            id: 2,
            title: 'Земельный участок',
            description: 'Оценка земельного участка под строительство',
            price: 35000,
            commission: 7000,
            phone: '+7 (777) 234-56-78',
            date: '2024-03-05',
            address: 'мкр. Самал-2, уч. 15',
            status_id: 4, // refunded
            performer: 'Турсунбаев Ержан Кайратович'
        },
        {
            id: 3,
            title: 'Коммерческое помещение',
            description: 'Оценка торгового помещения в ТЦ',
            price: 45000,
            commission: 9000,
            phone: '+7 (777) 345-67-89',
            date: '2024-03-04',
            address: 'пр. Достык 89, ТЦ "Центр"',
            status_id: 5, // rejected
            performer: 'Турсунбаев Ержан Кайратович'
        }
    ];

    return (
        <>
            <div className="flex flex-col gap-3">
                goidaaaa
                {/* {applications.map((application, index) => (
                    <ArchiveCard
                        price_min={""} price_max={""} execute_at={""} balance_history={[]} isLoading={false} key={index}
                        {...application} />
                ))} */}
            </div>
        </>
    );
};
