import React, { useEffect, useContext } from 'react';
import { useLauncheMissionInfoQuery } from '../../generated/graphql';
import {GlobalContext} from '../../GlobalProvider/GlobalProvider';

type Props = {
    loadingFeedBack: () => void;
};

const MissionInfoContainer: React.FC<Props> = ({ loadingFeedBack}) => {
    const {missionNo} = useContext(GlobalContext);
    const { data, error, loading } = useLauncheMissionInfoQuery({ variables: { id: `${missionNo}` } });

    useEffect(() => {
        if (!loading) loadingFeedBack()
    })

    if (loading)
        return <div>Loading</div>

    if (error || !data)
        return <div>Error</div>

    return (
        <div>
            {JSON.stringify(data,null,2)}
        </div>
    )
}

export default MissionInfoContainer