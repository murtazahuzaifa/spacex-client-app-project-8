import React, { useContext } from 'react';
import { MissionsInfoQuery } from '../../generated/graphql';
import style from './style.module.css'
import {GlobalContext} from '../../GlobalProvider/GlobalProvider';

interface Props {
    data: MissionsInfoQuery
}

export const MissionList: React.FC<Props> = ({ data }) => {
    // const [selectedMission, setSelectedMission] = useState(144);
    const {missionNo, SetMissionNo} = useContext(GlobalContext);

    console.log(missionNo)
    return (
        <div>
            <h2 className={`${style.launchListHeading}`} >Launches</h2>
            <div className={`${style.launchList}`}>
                <ul>
                    {data.launches?.map((launchObj, id) => (
                        <li
                            key={ (id+1) }
                            className={missionNo === (id+1)  ? style.selected : ""}
                            onClick={() => { SetMissionNo( (id+1) ) }}
                        >
                            <div>{launchObj?.mission_name}({launchObj?.launch_year})</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}