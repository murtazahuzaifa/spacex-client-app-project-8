import React from 'react';
import { MissionsInfoQuery } from '../../generated/graphql';

interface Props{
    data: MissionsInfoQuery
}

export const MissionList:React.FC<Props> = ({data}) => {
    return (
        <div>
            <ul>
                {data.launches?.map((launchObj, id)=>(
                    <li key={id}>
                        {launchObj?.flight_number} = {launchObj?.launch_year} = {launchObj?.mission_name}
                    </li>
                ))}
            </ul>
        </div>
    )
}