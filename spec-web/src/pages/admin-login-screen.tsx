import { Input } from '../shared/ui/input/input'
import { Button } from '../shared/ui/button/button'
import { SyntheticEvent } from 'react';

import { useAdminLoginStore } from '../entities/admin-login/model/admin-login-store';
import { useAdminLogin } from '../entities/admin-login/api/use-admin-login';
import { useNavigate } from 'react-router';
import { useAuthData } from '../entities/auth-user/api/use-auth-data';

export const AdminLogin = () => {
    const { mutate, isPending, error } = useAdminLogin()
    const { username, password, setUsername, setPassword } = useAdminLoginStore()
    const { saveToken, saveRole, saveUserId } = useAuthData();
    const navigate = useNavigate();

    const isDisabled = !username.trim() || !password.trim() || isPending;

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();


        mutate({ username, password },
            {
                onSuccess: (data?: any) => {
                    if (data?.token && data?.admin?.role && data?.admin?.id) {
                        saveUserId(data?.admin?.id)
                        saveToken(data?.token);
                        saveRole(data?.admin?.role);
                        console.log("Role:", data?.admin?.role)
                        navigate('/admin/application');
                    }
                    setUsername('');
                    setPassword('');
                },
                onError: (error: any) => {
                    console.log(error.message);
                }
            }
        )
    }

    return (
        <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
                <span className='text-dark font-[600] text-[24px]'>Вход</span>
                <Input
                    type="text"
                    className="w-full mt-8"
                    placeholder='Логин'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="password"
                    className="w-full mt-2"
                    placeholder='Пароль'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <span className="text-red-500 text-sm mt-4 w-full items-center justify-center flex">Неверный логин или пароль</span>}
            <Button
                variant={isDisabled ? 'disabled' : 'default'}
                label={isPending ? "Загрузка..." : "Войти"}
                className="mt-auto"
                type="submit"
                disabled={isDisabled}
            />
        </form>
    )
}
