import { CategoriesList } from "../features/categories-list/ui/categories-list";
import { ProfileHeader } from "../features/profile-header/ui/profile-header";
import { StatisticsCard } from "../features/statistics-card/ui/statistics-card";
import { Button } from "../shared/ui/button/button";
import { FormattedPhone } from "../shared/ui/formatted-phone/formatted-phone";

import { useAuthData } from "../entities/auth-user/api/use-auth-data";

import { useGetCategories } from "../entities/categories/api/use-get-categories";

export const ProfileScreen = () => {
    const { data: categories } = useGetCategories()
    const { logout } = useAuthData();

    const handleLogout = () => {
        logout()
    };

    const rawPhone = localStorage.getItem('phone')

    return (
        <div className="flex flex-col">
            <ProfileHeader
                name="Gaidar Timirbaev"
                phone={<FormattedPhone phone={rawPhone} />}
                city="Tashkent"
            />
            <CategoriesList categories={categories} />
            <StatisticsCard
                date="01.01.2025"
                applications={1000}
                totalEarned={300000}
                commission={88000}
                earned={212000}
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
