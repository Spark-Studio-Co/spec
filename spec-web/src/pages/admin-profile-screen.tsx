import { useAuthData } from "../entities/auth-user/api/use-auth-data"
import { useNavigate } from "@tanstack/react-router"
import { ProfileHeader } from "../features/profile-header/ui/profile-header"
import { CategoriesList } from "../features/categories-list/ui/categories-list"
import { StatisticsCard } from "../features/statistics-card/ui/statistics-card"

export const AdminProfileScreen = () => {
    const { removeToken } = useAuthData()
    const navigate = useNavigate()

    const handleLogout = () => {
        removeToken();
        navigate({ to: '/admin-login', replace: true });
    };

    const categories = [
        { id: 1, name: "Настройки", onClick: () => { } },
        { id: 2, name: "Выйти", onClick: handleLogout }
    ]

    return (
        <div className="flex flex-col">
            <ProfileHeader name="Admin User" phone="+998 99 999 99 99" city="Admin City" />
            <CategoriesList categories={categories} />
            <StatisticsCard
                date="01.01.2025"
                applications={1000}
                totalEarned={300000}
                commission={88000}
                earned={212000}
                onDateChange={(date) => {
                    // Handle date change
                }}
            />
        </div>
    )
}
