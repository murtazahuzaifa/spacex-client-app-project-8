import React, {createContext, useState} from 'react';

export const GlobalContext = createContext<any>({});

export const GlobalProvider:React.FC<{children:any}> = ({children})=>{

    const [missionNo, SelectMissionNo] = useState<number>(1);

    const SetMissionNo = (val:number)=>{ SelectMissionNo(val) }

    return(
        <GlobalContext.Provider value={{missionNo, SetMissionNo}} >
            {children}
        </GlobalContext.Provider>
    )
}
