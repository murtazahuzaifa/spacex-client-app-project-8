import React from 'react';
import { useLauncheMissionInfoQuery } from '../../generated/graphql';

const MissionInfoContainer:React.FC<{id:number}> = ({id})=>{
    const {data, error, loading} = useLauncheMissionInfoQuery({variables:{id:`${id}`}});

    if (loading)
        return <div>Loading</div>

    if(error || !data)
        return <div>Error</div>

    return(
        <div>
            {JSON.stringify(data)}
        </div>
    )
}

export default MissionInfoContainer