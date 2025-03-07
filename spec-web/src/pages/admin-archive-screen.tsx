import { AdminArchiveCard } from "../features/admin-archive-card/ui/admin-archive-card";

export const AdminArchiveScreen = () => {
    const applications = [
        {
            id: 1,
            title: 'Двухкомнатная квартира',
            description: 'Площадь 54м2, 2/5 этаж, 2 спальни, 1 ванная',
            price_min: '15000000',
            price_max: '15000000',
            commission: '150000',
            phone: '+7 (777) 123-45-67',
            execute_at: '2024-03-06T14:30:00Z',
            address: 'г. Астана, ул. Абая 123, кв. 45',
            status_id: 6,
            performer_name: 'Турсунбаев Ержан Кайратович',
            performer_phone: '+7 (777) 999-88-77',
            balance_history: [1],
        },
        {
            id: 2,
            title: 'Земельный участок',
            description: 'Участок 10 соток под ИЖС, все коммуникации',
            price_min: '35000000',
            price_max: '35000000',
            commission: '350000',
            phone: '+7 (777) 234-56-78',
            execute_at: '2024-03-05T10:15:00Z',
            address: 'г. Астана, мкр. Самал-2, уч. 15',
            status_id: 4, // refunded
            performer_name: 'Сагинтаев Аскар Муратович',
            performer_phone: '+7 (777) 111-22-33',
            balance_history: [],
            comment: 'Клиент отказался от услуги из-за высокой стоимости',
        },
        {
            id: 3,
            title: 'Коммерческое помещение',
            description: 'Торговое помещение 120м2, первый этаж, отдельный вход',
            price_min: '45000000',
            price_max: '45000000',
            commission: '450000',
            phone: '+7 (777) 345-67-89',
            execute_at: '2024-03-04T16:45:00Z',
            address: 'г. Астана, пр. Достык 89, ТЦ "Центр"',
            status_id: 5, // rejected
            performer_name: 'Искакова Айгерим Болатовна',
            performer_phone: '+7 (777) 444-55-66',
            balance_history: [],
            comment: 'Клиент выбрал другую компанию',
        }
    ];

    return (
        <div className="flex flex-col gap-3">
            {applications.map((application) => (
                <AdminArchiveCard
                    key={application.id}
                    {...application}
                />
            ))}
        </div>
    );
};
