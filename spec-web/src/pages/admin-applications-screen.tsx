import { useState } from 'react';
import { AdminApplicationCard } from "../features/admin-application-card/ui/admin-application-card"
import { Popup } from "../widgets/popup/popup";
import { Selector } from '../shared/ui/selector/selector';

import { usePopupStore } from "../shared/model/popup-store";
import { useSelectorStore } from "../shared/model/selector-store";
import { useGetApplications } from '../entities/application/api/use-get-applications';
import { useGetPerformers } from '../entities/performer/api/use-get-performers';
import { useTakeApplication } from '../entities/application/api/use-take-application';


export const AdminApplicationScreen = () => {
    const { mutate } = useTakeApplication()
    const { data: applications } = useGetApplications()
    const [cityId, setCityId] = useState<number>(0)
    const { data: performers } = useGetPerformers('', cityId)
    const { selected, setSelectedName } = useSelectorStore('performerSelector')
    const performerSelector = usePopupStore('performerSelector')
    const [currentCard, setCurrentCard] = useState<number | null>(null)


    const handlePerformerSelect = () => {
        mutate({
            data: { status_id: 2, performer_user_id: selected },
            id: currentCard
        }, {
            onSuccess: () => {
                console.log("Taken by performer")
                setSelectedName('');
                performerSelector.close();
            },
            onError: (error) => {
                console.error("Error taking application:", error)
            }
        })
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {applications?.map((application: any, index: number) => (
                    <AdminApplicationCard
                        key={index}
                        users_tasks_performer_user_idTousers={application?.task?.users_tasks_performer_user_idTousers}                        {...application}
                        onClick={() => {
                            setCurrentCard(application.id)
                            setCityId(application.city_id)
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
                    children={<Selector isPerformer storeKey="performerSelector" label="Поиск" className="mb-8" options={performers} />}
                    disabled={!selected || !performers?.some((p: any) => p.id === selected)}
                    onClick={handlePerformerSelect}
                    onClose={() => {
                        setSelectedName('');
                    }}
                />
            )}
        </>
    )
}
