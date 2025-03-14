import { useState } from 'react';
import { AdminApplicationCard } from "../features/admin-application-card/ui/admin-application-card"
import { Popup } from "../widgets/popup/popup";

import { usePopupStore } from "../shared/model/popup-store";
import { useSelectorStore } from "../shared/model/selector-store";

import { useGetApplications } from '../entities/application/api/use-get-applications';


export const AdminApplicationScreen = () => {
    const { data } = useGetApplications()
    const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
    const { selected, setSelected } = useSelectorStore('performerSelector')
    const performerSelector = usePopupStore('performerSelector')

    const handlePerformerSelect = () => {
        if (selected && selectedApplication !== null) {
            console.log(`Assigning ${selected} to application ${selectedApplication}`);
        }
        // setSelected('');
        setSelectedApplication(null);
        performerSelector.close();
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data?.map((application: any) => (
                    <AdminApplicationCard
                        performer_name=''
                        performer_phone=''
                        key={application.id}
                        {...application}
                        onClick={() => {
                            setSelectedApplication(application.id);
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
                    // children={<Selector storeKey="performerSelector" label="Поиск" className="mb-8" options={performers} />}
                    // disabled={!performers.includes(selected)}
                    onClick={handlePerformerSelect}
                    onClose={() => {
                        // setSelected('');
                        setSelectedApplication(null);
                    }}
                />
            )}
        </>
    )
}
