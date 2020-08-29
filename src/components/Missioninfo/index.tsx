import React, { useEffect, useContext, useState } from 'react';
import NavBar from '../NavBar';
import { useLauncheMissionInfoQuery, LauncheMissionInfoQuery } from '../../generated/graphql';
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
    const [fetchData, SetFetchData] = useState<LauncheMissionInfoQuery>();

    const afterLoadingCallback = () => {
        SetFetchData(data)
        if (!loading) {
            if (data) {
                localStorage.setItem(`missionNo${missionNo}`, JSON.stringify(data));
            }
            else if (error) {
                const localData = localStorage.getItem(`missionNo${missionNo}`);
                if (!data && localData) {
                    SetFetchData(JSON.parse(localData));
                }
            }
        }}

    useEffect(() => {
        if(loadingFeedBack){
            if (!loading) loadingFeedBack()
        }
    })
    useEffect( afterLoadingCallback, [loading, missionNo])

    if (loading)
        return <div> <NavBar /> <LogoLoading/> </div>

    // console.log('fetch data', fetchData, 'mission no', missionNo, ' data', data,' loading', loading );
    if (fetchData){
        let rocketName = fetchData.launch?.rocket?.rocket_name;
    const rocketImgLink = rocketName === "Falcon 1" ? rocketImg["Falcon 1"] : rocketName === "Falcon 9" ? rocketImg["Falcon 9"] : rocketName === "Falcon Heavy" ? rocketImg["Falcon Heavy"] : rocketImg["noImage"]
    return (
        <div>
            <NavBar />
            <div className={`${style.missionInfoContainer}`}>
                <br/>
                <h1 >Mission: {fetchData.launch?.mission_name}</h1>
                <br />
                <div><b>Launch year:</b> {fetchData.launch?.launch_year}</div>
                <div><b>Flight-{fetchData.launch?.flight_number}:</b> {fetchData.launch?.launch_success ? <span style={{ color: 'green' }}>Succeed</span> : <span style={{ color: 'red' }}>Failed</span>}</div>
                <div><b>Rocket:</b> {rocketName} <i>({fetchData.launch?.rocket?.rocket_type})</i></div>
                <br />
                <div className={`${style.missionDetails}`}> <h3>Details:</h3> <p>{fetchData.launch?.details}</p> </div>
                <div className={`${style.imageDiv}`} >
                    {fetchData.launch?.links?.flickr_images?.length === 0 ? // if there is an image list coming from the api
                        (rocketName ? <img src={rocketImgLink} alt="rocket" /> : null) :
                        fetchData.launch?.links?.flickr_images?.map((imglink, id) =>
                            imglink ? <img src={imglink} alt="rocket" key={id} /> : null)
                    }
                </div>

            </div>
        </div>
    )}
        
    return <div> <NavBar />  <h1>Error</h1> </div>
}

export default MissionInfoContainer