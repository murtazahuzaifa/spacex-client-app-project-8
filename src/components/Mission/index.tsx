import React, { useEffect } from 'react';
import { useMissionsInfoQuery} from '../../generated/graphql';
import {MissionList} from './MissionList';

const MissionContainer:React.FC<{loadingFeedBack:()=>void}> = ({loadingFeedBack}) => {

    const {data, error, loading} = useMissionsInfoQuery();
    // const [isLoading, setIsLoading ] = useState<boolean>(loading);
    useEffect(()=>{
        if (!loading) loadingFeedBack()
    })

    if (loading)
        return <div>Loading</div>

    if(error || !data)
        return <div>Error</div>

    return(
        <div>
            <MissionList data={data}/>
        </div>
    )
}

export default MissionContainer