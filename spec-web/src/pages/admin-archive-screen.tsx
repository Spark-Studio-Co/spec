import { AdminArchiveCard } from "../features/admin-archive-card/ui/admin-archive-card";
import { Checkbox } from "../shared/ui/checkbox/checkbox";

import { useGetArchive } from "../entities/archive/api/use-get-archive";
import { useCheckboxStore } from "../shared/model/checkbox-store";
import { useAdminCheck } from "../entities/admin-login/api/use-admin-check";
import { useAuthData } from '../entities/auth-user/api/use-auth-data';
import { useEffect } from "react";

export const AdminArchiveScreen = () => {
    const { data: archive, isLoading, error } = useGetArchive()
    const { checked } = useCheckboxStore('archive')
    const { logout, userId } = useAuthData();

    const { data: adminCheck } = useAdminCheck(userId)

    useEffect(() => {
        if (adminCheck?.isAdmin === false) {
            window.location.href = '/admin'
            logout()
        }
        console.log(adminCheck)
    }, [])

    if (isLoading) return <p className="text-center">Загрузка заявок...</p>;
    if (error) return <p className="text-red-500 text-center">Ошибка: {error.message}</p>;


    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-x-2 items-center">
                <span className="text-dark font-[400] text-[16px]">Неоплаченные</span>
                <Checkbox storeKey="archive" />
            </div>
            {archive.filter((app: any) => app?.balance_history?.length === 0) && checked && <p className="text-center absolute top-1/2 left-1/2 -translate-x-1/2">Все заявки оплачены</p>}
            {checked ?
                <div className="flex flex-col gap-3">
                    {archive.filter((app: any) => app.balance_history?.length === 0).map((application: any, index: number) => (
                        <AdminArchiveCard
                            key={index}
                            {...application}
                        />
                    ))}
                </div> :
                archive.map((application: any, index: number) => (
                    <AdminArchiveCard
                        key={index}
                        {...application}
                    />
                ))
            }
        </div>
    );
};
