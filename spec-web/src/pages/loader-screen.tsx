import loader_bg from '../assets/loader_bg.webp'

export const LoaderScreen = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                background: `
                    url(${loader_bg}) no-repeat`,
                backgroundSize: '100%',
            }}
        >
            <div className='ml-10 mt-24 flex flex-col items-start'>
                <span className='text-main font-bold text-[72px]'>SPEC</span>
                <span className='text-black font-[600] text-[4rem] leading-none mt-5'>Всегда <br />
                    Найдётся
                    <br />
                    Работа</span>
            </div>
        </div>
    )
}

