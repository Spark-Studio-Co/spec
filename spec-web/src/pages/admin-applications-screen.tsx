import { useState } from 'react';
import { AdminApplicationCard } from "../features/admin-application-card/ui/admin-application-card"
import { Popup } from "../widgets/popup/popup";
import { Selector } from "../shared/ui/selector/selector";

import { usePopupStore } from "../shared/model/popup-store";
import { useSelectorStore } from "../shared/model/selector-store";

const performers = [
    'Турсунбаев Ержан Кайратович',
    'Сагинтаев Аскар Муратович',
    'Искакова Айгерим Болатовна',
    'Кусаинов Дамир Русланович',
    'Мухамеджанова Айнур Сериковна'
];

export const AdminApplicationScreen = () => {
    const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
    const { selected, setSelected } = useSelectorStore('performerSelector')
    const performerSelector = usePopupStore('performerSelector')

    const handlePerformerSelect = () => {
        if (selected && selectedApplication !== null) {
            // Here you would typically make an API call to assign the performer
            console.log(`Assigning ${selected} to application ${selectedApplication}`);
        }
        setSelected('');
        setSelectedApplication(null);
        performerSelector.close();
    };

    const applications = [
        {
            id: 1,
            title: 'Двухкомнатная квартира',
            status_id: 1,
            description: 'Площадь 54м2, 2/5 этаж, 2 спальни, 1 ванная',
            price_min: '15 000 000',
            price_max: '15 000 000',
            commission: '150 000',
            phone: '+7 (777) 123-45-67',
            execute_at: '2024-03-12T10:00:00Z',
            address: 'г. Астана, ул. Кабанбай батыра, 11'
        },
        {
            id: 2,
            title: 'Трехкомнатная квартира',
            status_id: 2,
            description: 'Площадь 85м2, 7/9 этаж, 3 спальни, 2 ванные',
            price_min: '25 000 000',
            price_max: '25 000 000',
            commission: '250 000',
            phone: '+7 (777) 234-56-78',
            execute_at: '2024-03-13T10:00:00Z',
            address: 'г. Астана, пр. Мангилик Ел, 53',
            performer: 'Сагинтаев Аскар Муратович'
        },
        {
            id: 3,
            title: 'Студия',
            status_id: 3,
            description: 'Площадь 32м2, 4/12 этаж, 1 спальня, 1 ванная',
            price_min: '9 000 000',
            price_max: '9 000 000',
            commission: '90 000',
            phone: '+7 (777) 345-67-89',
            execute_at: '2024-03-14T10:00:00Z',
            address: 'г. Астана, ул. Сыганак, 25',
            performer: 'Искакова Айгерим Болатовна'
        },
        {
            id: 4,
            title: 'Четырехкомнатная квартира',
            status_id: 4,
            description: 'Площадь 120м2, 15/16 этаж, 4 спальни, 2 ванные',
            price_min: '35 000 000',
            price_max: '35 000 000',
            commission: '350 000',
            phone: '+7 (777) 456-78-90',
            execute_at: '2024-03-15T10:00:00Z',
            address: 'г. Астана, ул. Туран, 37',
            performer: 'Кусаинов Дамир Русланович'
        },
        {
            id: 5,
            title: 'Однокомнатная квартира',
            status_id: 5,
            description: 'Площадь 45м2, 3/9 этаж, 1 спальня, 1 ванная',
            price_min: '12 000 000',
            price_max: '12 000 000',
            commission: '120 000',
            phone: '+7 (777) 567-89-01',
            execute_at: '2024-03-16T10:00:00Z',
            address: 'г. Астана, ул. Сарайшык, 5',
            performer: 'Мухамеджанова Айнур Сериковна'
        }
    ];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {applications.map(application => (
                    <AdminApplicationCard
                        key={application.id}
                        {...application}
                        onClick={() => {
                            setSelectedApplication(application.id);
                            performerSelector.open();
                        }}
                    />
                ))}
            </div>

            {performerSelector.isOpen && (
                <Popup
                    isCenter={false}
                    title="Исполнитель"
                    storeKey="performerSelector"
                    actionLabel="Сохранить"
                    closeLabel="Отмена"
                    children={<Selector storeKey="performerSelector" label="Поиск" className="mb-2" options={performers} />}
                    disabled={!performers.includes(selected)}
                    onClick={handlePerformerSelect}
                    onClose={() => {
                        setSelected('');
                        setSelectedApplication(null);
                    }}
                />
            )}
        </>
    )
}
