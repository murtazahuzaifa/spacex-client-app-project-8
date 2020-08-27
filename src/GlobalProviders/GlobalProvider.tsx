import React, { createContext, useState } from 'react';

export const GlobalContext = createContext<any>({});
export let missionNo:number, SelectMissionNo:(val:number)=>void, SetMissionNo:(val:number)=>void

export const GlobalProvider: React.FC<{ children: any }> = ({ children }) => {

    [missionNo, SelectMissionNo] = useState<number>(1);
    const [leftPaneOpen, setLeftPaneOpen] = useState<boolean>(false);

    SetMissionNo = (val: number) => { SelectMissionNo(val) }

    return (
        <GlobalContext.Provider value={{ missionNo,leftPaneOpen, SetMissionNo, setLeftPaneOpen,  }} >
            {children}
        </GlobalContext.Provider>
    )
}
