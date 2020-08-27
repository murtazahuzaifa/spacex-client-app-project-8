import React, { useContext } from 'react';
import { MissionsInfoQuery } from '../../generated/graphql';
import style from './style.module.css'
import {GlobalContext} from '../../GlobalProviders/GlobalProvider';

interface Props {
    data: MissionsInfoQuery
}

export let missionNo:number, SetMissionNo:(val:number)=>void
export let util = {SetMissionNo:(id:number) => {SetMissionNo( id+1 ) } }

export const MissionList: React.FC<Props> = ({ data }) => {
    // const [selectedMission, setSelectedMission] = useState(144);
    missionNo = useContext(GlobalContext).missionNo;
    SetMissionNo = useContext(GlobalContext).SetMissionNo;

    return (
        <div>
            <h2 className={`${style.launchListHeading}`} >Launches</h2>
            <div className={`${style.launchList}`}>
                <ul>
                    {data.launches?.map((launchObj, id) => (
                        <li
                            key={ (id+1) }
                            className={missionNo === (id+1)  ? style.selected : ""}
                            onClick={() => { util.SetMissionNo( id ) }}
                        >
                            <div>{launchObj?.mission_name}({launchObj?.launch_year})</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}