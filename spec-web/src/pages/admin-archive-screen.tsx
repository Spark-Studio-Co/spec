import { AdminArchiveCard } from "../features/admin-archive-card/ui/admin-archive-card";
import { Checkbox } from "../shared/ui/checkbox/checkbox";

import { useGetArchive } from "../entities/archive/api/use-get-archive";
import { useCheckboxStore } from "../shared/model/checkbox-store";
import { useAdminCheck } from "../entities/admin-login/api/use-admin-check";
import { useAuthData } from '../entities/auth-user/api/use-auth-data';
import { usePayComission } from "../entities/archive/api/use-pay-comission";
import { useEffect, useMemo, useState } from "react";

export const AdminArchiveScreen = () => {
    const { data: archive, isLoading, error } = useGetArchive()
    const { checked } = useCheckboxStore('archive')
    const { logout, userId } = useAuthData();
    const { data: adminCheck } = useAdminCheck(userId)

    const [currentCard, setCurrentCard] = useState<number | null>(null)

    const { mutate } = usePayComission()

    const userIdNumber = userId ? Number(userId) : 0


    const handlePayComission = (index: number, commission: number, price_max: number) => {
        console.log("Click: Pay commission")

        setCurrentCard(index);
        const taskId = archive[index]?.id
        const amount = price_max / commission;

        mutate({
            task_id: taskId,
            user_id: userIdNumber,
            amount,
            reason_id: 1
        }, {
            onSuccess: () => {
                console.log('Paid comission')
            },
            onError: (error: any) => {
                console.log(error.response)
            }
        })
    }

    const filtered = useMemo(() => {
        return checked
            ? archive.filter((app: any) => app.balance_history?.length === 0)
            : archive
    }, [archive, checked])

    console.log(archive)

    useEffect(() => {
        if (adminCheck?.isAdmin === false) {
            window.location.href = '/admin'
            logout()
        }
        console.log(adminCheck)
    }, [])


    if (isLoading) return <p className="text-center">Загрузка архива...</p>;
    if (isLoading) return <p className="text-center">Загрузка заявок...</p>;
    if (error) return <p className="text-red-500 text-center">Ошибка: {error.message}</p>;


    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-x-2 items-center">
                <span className="text-dark font-[400] text-[16px]">Неоплаченные</span>
                <Checkbox storeKey="archive" />
            </div>
            {checked && filtered.length === 0 && (
                <p className="text-center absolute top-1/2 left-1/2 -translate-x-1/2">
                    Все заявки оплачены
                </p>
            )}

            <div className="flex flex-col gap-3">
                {filtered.map((application: any, index: number) => (
                    <AdminArchiveCard key={index} {...application} title={application.categories?.name || 'Без названия'} performer_name={application.users_tasks_performer_user_idTousers?.fullname}
                        performer_phone={application.users_tasks_performer_user_idTousers?.phone}
                        onClick={() => handlePayComission(index, application.commission, application.price_max)}
                    />
                ))}
            </div>
        </div>
    );
};
