import React, { useEffect, useContext } from 'react';
import NavBar from '../NavBar';
import { useLauncheMissionInfoQuery } from '../../generated/graphql';
import { GlobalContext } from '../../GlobalProviders/GlobalProvider';
import style from './style.module.css'
import LogoLoading from '../LogoLoading';

type Props = {
    loadingFeedBack?: () => void;
};

const rocketImg = {
    "Falcon 1": "https://i.ytimg.com/vi/TKKa4TaRm6c/maxresdefault.jpg",
    "Falcon 9": "https://i.gadgets360cdn.com/large/falcon_9_spacex_1519025573052.jpg",
    "Falcon Heavy": "https://cdn.vox-cdn.com/thumbor/e_xTkWxb8ijkVBLVYsW8fliGTqs=/0x0:4267x2400/1200x800/filters:focal(2016x974:2698x1656)/cdn.vox-cdn.com/uploads/chorus_image/image/56491697/SpaceX_Falcon_Heavy_Launch_Pad.0.0.jpg",
    "noImage": "https://i.insider.com/5a79254af9d413d5068b46ca?width=1100&format=jpeg&auto=webp",
}

const MissionInfoContainer: React.FC<Props> = ({ loadingFeedBack }) => {
    const { missionNo } = useContext(GlobalContext);
    const { data, error, loading } = useLauncheMissionInfoQuery({ variables: { id: `${missionNo}` } });

    useEffect(() => {
        if(loadingFeedBack){
            if (!loading) loadingFeedBack()
        }
    })

    if (loading)
        return <div> <NavBar /> <LogoLoading/> </div>

    if (error || !data)
        return <div> <NavBar />  <h1>Error</h1> </div>

    let rocketName = data.launch?.rocket?.rocket_name;
    const rocketImgLink = rocketName === "Falcon 1" ? rocketImg["Falcon 1"] : rocketName === "Falcon 9" ? rocketImg["Falcon 9"] : rocketName === "Falcon Heavy" ? rocketImg["Falcon Heavy"] : rocketImg["noImage"]
    return (
        <>
            <NavBar />
            <div className={`${style.missionInfoContainer}`}>
                <br/>
                <h1>Mission: {data.launch?.mission_name}</h1>
                <br />
                <div><b>Launch year:</b> {data.launch?.launch_year}</div>
                <div><b>Flight-{data.launch?.flight_number}:</b> {data.launch?.launch_success ? <span style={{ color: 'green' }}>Succeed</span> : <span style={{ color: 'red' }}>Failed</span>}</div>
                <div><b>Rocket:</b> {rocketName} <i>({data.launch?.rocket?.rocket_type})</i></div>
                <br />
                <div className={`${style.missionDetails}`}> <h3>Details:</h3> <p>{data.launch?.details}</p> </div>
                <div className={`${style.imageDiv}`} >
                    {data.launch?.links?.flickr_images?.length === 0 ? // if there is an image list coming from the api
                        (rocketName ? <img src={rocketImgLink} alt="rocket" /> : null) :
                        data.launch?.links?.flickr_images?.map((imglink, id) =>
                            imglink ? <img src={imglink} alt="rocket" key={id} /> : null)
                    }
                </div>

            </div>
        </>
    )
}

export default MissionInfoContainer