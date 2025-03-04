declare global {
    interface Window {
        ym: (counterId: string, eventName: string, eventParams?: any) => void;
        [key: string]: any; // Allow string indexing on window
    }
}

export const YM_COUNTER_ID = '997293d2-388d-4426-b40a-992ff1193b88';

type YandexMetrikaInitFunction = (m: Window, e: Document, t: string, r: string, i: string, k: HTMLScriptElement, a: HTMLScriptElement) => void;

export const initYandexMetrica = () => {
    const initFunction: YandexMetrikaInitFunction = (m, e, t, r, i, k, a) => {
        m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
        m[i].l = 1 * new Date().getTime();
        for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
        k = e.createElement(t) as HTMLScriptElement;
        a = e.getElementsByTagName(t)[0] as HTMLScriptElement;
        k.async = true;
        k.src = r;
        a.parentNode?.insertBefore(k, a);
    };

    initFunction(
        window,
        document,
        "script",
        "https://mc.yandex.ru/metrika/tag.js",
        "ym",
        document.createElement('script'),
        document.getElementsByTagName('script')[0]
    );

    window.ym(YM_COUNTER_ID, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true
    });
};

export const trackEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
    if (window.ym) {
        window.ym(YM_COUNTER_ID, eventName, eventParams);
    }
};
