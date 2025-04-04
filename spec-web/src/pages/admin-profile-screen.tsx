import { CategoriesList } from "../features/categories-list/ui/categories-list";
import { ProfileHeader } from "../features/profile-header/ui/profile-header";
import { StatisticsCard } from "../features/statistics-card/ui/statistics-card";
import { Button } from "../shared/ui/button/button";

import { useAuthData } from "../entities/auth-user/api/use-auth-data";

import { useGetCategories } from "../entities/categories/api/use-get-categories";
import { useEffect } from "react";
import { useUserData } from "../entities/user/api/use-user-data";
import { useQueryClient } from "@tanstack/react-query";
import { FormattedPhone } from "../shared/ui/formatted-phone/formatted-phone";
import { useGetCityById } from "../shared/hooks/useGetCityById";

export const AdminProfileScreen = () => {
    const queryClient = useQueryClient()
    const { data: categories } = useGetCategories()
    const { data: userData, refetch } = useUserData()
    const { logout } = useAuthData();

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
                city={useGetCityById(userData?.city_id).name}
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
