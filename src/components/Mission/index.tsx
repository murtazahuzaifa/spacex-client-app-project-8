import React, { useEffect } from 'react';
import { useMissionsInfoQuery} from '../../generated/graphql';
import {MissionList} from './MissionList';
import style from './style.module.css'

const MissionContainer:React.FC<{loadingFeedBack?:()=>void}> = ({loadingFeedBack}) => {

    const {data, error, loading} = useMissionsInfoQuery();
    // const [isLoading, setIsLoading ] = useState<boolean>(loading);
    useEffect(()=>{
        if(loadingFeedBack){
            if (!loading) loadingFeedBack()
        }
        
    })

    if (loading)
        return <div>Loading</div>

    if(error || !data)
        return <h1>Error</h1>

    return(
        <div className={`${style.missionContainer}`}>
            <MissionList data={data}/>
        </div>
    )
}

export default MissionContainer