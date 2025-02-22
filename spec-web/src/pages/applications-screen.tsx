import { ApplicationCard } from "../features/application-card/ui/application-card"
import { Popup } from "../widgets/popup/popup"

import { usePopupStore } from "../shared/model/popup-store"

export const ApplicationScreen = () => {

    const { isOpen, passedValue } = usePopupStore('phone-popup')

    const applications = [
        {
            title: 'Двухкомнатная квартира',
            description: 'Площадь 54м2, 2/5 этаж, 2 спальни, 1 ванная',
            price: '15 000 000',
            comission: '10%',
            phone: '+7 (495) 123-45-67',
            date: '12.02.2023',
            address: 'г. Москва, ул. Ленина, д. 12'
        },
        {
            title: 'Трехкомнатная квартира',
            description: 'Площадь 90м2, 5/9 этаж, 3 спальни, 1 ванная',
            price: '20 000 000',
            comission: '10%',
            phone: '+7 (495) 123-45-67',
            date: '22.02.2023',
            address: 'г. Москва, ул. Ленина, д. 12'
        },
        {
            title: 'Двухкомнатная квартира',
            description: 'Площадь 54м2, 2/5 этаж, 2 спальни, 1 ванная',
            price: '15 000 000',
            comission: '10%',
            phone: '+7 (495) 123-45-67',
            date: '12.02.2023',
            address: 'г. Москва, ул. Ленина, д. 12'
        },
        {
            title: 'Трехкомнатная квартира',
            description: 'Площадь 90м2, 5/9 этаж, 3 спальни, 1 ванная',
            price: '20 000 000',
            comission: '10%',
            phone: '+7 (495) 123-45-67',
            date: '22.02.2023',
            address: 'г. Москва, ул. Ленина, д. 12'
        }
    ]


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {applications.map((application, index) => (
                    <ApplicationCard key={index} {...application} />
                ))}
            </div>

            {isOpen && (
                <Popup
                    title="Звонок клиенту"
                    storeKey="phone-popup"
                    actionLabel={passedValue || "Продолжить"}
                    onClick={() => { window.location.href = `tel:${passedValue}` }}
                />
            )}
        </>
    )
}
