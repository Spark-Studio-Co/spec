import { useEffect, useState } from 'react';
import { AdminApplicationCard } from "../features/admin-application-card/ui/admin-application-card"
import { Popup } from "../widgets/popup/popup";
import { Selector } from '../shared/ui/selector/selector';

import { usePopupStore } from "../shared/model/popup-store";
import { useSelectorStore } from "../shared/model/selector-store";
import { useGetApplications } from '../entities/application/api/use-get-applications';
import { useGetPerformers } from '../entities/performer/api/use-get-performers';
import { useTakeApplication } from '../entities/application/api/use-take-application';
import { useAdminCheck } from "../entities/admin-login/api/use-admin-check";
import { useAuthData } from '../entities/auth-user/api/use-auth-data';


export const AdminApplicationScreen = () => {
    const { mutate } = useTakeApplication()
    const { data: applications, refetch } = useGetApplications()
    const [cityId, setCityId] = useState<number>(0)
    const { data: performers } = useGetPerformers('', cityId)
    const { selected, setSelectedName } = useSelectorStore('performerSelector')
    const performerSelector = usePopupStore('performerSelector')
    const [currentCard, setCurrentCard] = useState<number | null>(null)

    const { logout, userId } = useAuthData();
    const { data: adminCheck } = useAdminCheck(userId)

    useEffect(() => {
        if (adminCheck?.isAdmin === false) {
            window.location.href = '/admin'
            logout()
        }
        console.log(adminCheck)
    }, [])

    useEffect(() => {
        refetch()
    }, [applications?.length])

    const handlePerformerSelect = () => {
        mutate({
            data: { status_id: 2, performer_user_id: selected },
            id: currentCard
        }, {
            onSuccess: () => {
                console.log("Taken by performer")
                setSelectedName('');
                performerSelector.close();
                refetch();
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
                        title={application.categories?.name || 'Без названия'}
                        {...application}
                        users_tasks_performer_user_idTousers={application?.users_tasks_performer_user_idTousers} onClick={() => {
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
