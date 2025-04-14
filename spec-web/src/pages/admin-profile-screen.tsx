import { CategoriesList } from "../features/categories-list/ui/categories-list";
import { ProfileHeader } from "../features/profile-header/ui/profile-header";
import { StatisticsCard } from "../features/statistics-card/ui/statistics-card";
import { Button } from "../shared/ui/button/button";

import { useAuthData } from "../entities/auth-user/api/use-auth-data";

import { useEffect } from "react";
import { useUserData } from "../entities/user/api/use-user-data";
import { useQueryClient } from "@tanstack/react-query";
import { FormattedPhone } from "../shared/ui/formatted-phone/formatted-phone";
import { useGetCityById } from "../shared/hooks/useGetCityById";
import { useAdminCheck } from "../entities/admin-login/api/use-admin-check";


export const AdminProfileScreen = () => {
    const queryClient = useQueryClient()
    const { data: userData, refetch } = useUserData()
    const { logout, userId } = useAuthData();

    const { data: adminCheck } = useAdminCheck(userId)

    const categories = Array.isArray(userData?.user_category)
        ? userData.user_category.map((item: any) => item.categories.name)
        : [];

    const city = useGetCityById(userData?.city_id)
    const cityName = city?.name || 'Не найден'

    useEffect(() => {
        if (adminCheck?.isAdmin === false) {
            window.location.href = '/admin'
            logout()
        }
        console.log(adminCheck)
    }, [])

    const currentDate = new Date().toISOString().split("T")[0];

    const handleLogout = () => {
        logout()
    };

    const rawPhone = localStorage.getItem('phone')

    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey: ['userData']
        })
        refetch()
    }, [userData])

    return (
        <div className="flex flex-col">
            <ProfileHeader
                name={userData?.fullname || ""}
                phone={<FormattedPhone phone={rawPhone} />}
                city={cityName}
            />
            <CategoriesList categories={categories} />
            <StatisticsCard
                date={currentDate}
                applications={0}
                totalEarned={0}
                commission={0}
                earned={0}
                onDateChange={(date) => {
                    if (date) {
                        const formattedDate = date.toLocaleDateString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })
                        console.log('Selected date:', formattedDate)
                    } else {
                        console.log('Date selection cleared')
                    }
                }}
            />
            <Button label="Выйти" variant="red" onClick={handleLogout} className="mt-8" />
        </div>
    )
}
