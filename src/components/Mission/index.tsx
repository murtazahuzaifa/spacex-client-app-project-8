import React, { useEffect, useState } from 'react';
import { useMissionsInfoQuery, MissionsInfoQuery } from '../../generated/graphql';
import { MissionList } from './MissionList';
import style from './style.module.css';

const MissionContainer: React.FC<{ loadingFeedBack?: () => void }> = ({ loadingFeedBack }) => {

    let { data, error, loading } = useMissionsInfoQuery();
    const [fetchData, SetFetchData] = useState<MissionsInfoQuery>();

    const afterLoadingCallback = () => {
        SetFetchData(data)
        if (!loading) {
            if (data) {
                localStorage.setItem("missions", JSON.stringify(data));
            }
            else if (error) {
                const localData = localStorage.getItem('missions');
                if (!data && localData) {
                    SetFetchData(JSON.parse(localData));
                }
            }
        }}

    useEffect(() => {
        if (loadingFeedBack) {
            if (!loading) loadingFeedBack()
        }
    })

    useEffect(afterLoadingCallback, [loading])


if (loading) return <div>Loading</div>

if (fetchData) {
    return (
        <div className={`${style.missionContainer}`}>
            <MissionList data={fetchData} />
        </div>
    )
}

return <h1>Error</h1>

}

export default MissionContainer