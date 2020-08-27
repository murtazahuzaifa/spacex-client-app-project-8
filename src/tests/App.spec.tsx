import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import App, { missionLoading, missionInfoloading, missionFeedBack, missionInfoFeedBack } from '../App';
import LogoLoading from '../components/LogoLoading';
import Mission from '../components/Mission';
import MissionInfo from '../components/Missioninfo';
import { act } from 'react-dom/test-utils';
import ApolloClientProvider from '../GlobalProviders/ApolloClientProvider';
import {GlobalProvider} from '../GlobalProviders/GlobalProvider';

// import {useMissionsInfoQuery, useLauncheMissionInfoQuery, MissionsInfoQuery, LauncheMissionInfoQuery } from '../generated/graphql';
// missionInfoContainerFeedBack as jest.Mock
describe('Render App', () => {
 
  // let AppWrapper:any;
  // beforeEach(()=>{
  // AppWrapper = mount(<App/>);
  // });
  // const missionInfo:MissionsInfoQuery = {launches:[{flight_number: 1, "mission_name": "FalconSat", "launch_year": 2006}, {flight_number: 2, "mission_name": "DemoSat", "launch_year": 2007 }]}
  // const launchInfo: LauncheMissionInfoQuery = {"launch":{mission_name:"FalconSat",flight_number:1,launch_year:2006,launch_success:false,details:"Engine failure at 33 seconds and loss of vehicle",launch_site:{"site_name":"Kwajalein Atoll","__typename":"LaunchSite"},"rocket":{"rocket_name":"Falcon 1","rocket_type":"Merlin A","__typename":"LaunchRocket"},"links":{"flickr_images":[],"__typename":"LaunchLinks"},"__typename":"Launch"}}
  // jest.mock('../generated/graphql');
  // const mockMissionQuery = useMissionsInfoQuery as jest.Mock;
  // const mockLaunchQuery = useLauncheMissionInfoQuery as jest.Mock;

  it('Mission, MissionInfo and logoloading should be there', () => {
    const AppWrapper: ReactWrapper = mount(<ApolloClientProvider><GlobalProvider><App /></GlobalProvider></ApolloClientProvider>);
    const MissionContainer = AppWrapper.find(Mission);
    const MissionInfoContainer = AppWrapper.find(MissionInfo);
    const logoLoading = AppWrapper.find(LogoLoading);

    expect(MissionContainer.exists()).toBe(true);
    expect(MissionInfoContainer.exists()).toBe(true);
    expect(logoLoading.length).toBe(2);
  });

  it('loading text should be render', () => {
    const AppWrapper: ReactWrapper = mount(<ApolloClientProvider><GlobalProvider><App /></GlobalProvider></ApolloClientProvider>);
    expect(missionLoading).toBe(true);
    expect(missionInfoloading).toBe(true);
    act(() => {
      missionFeedBack()
      missionInfoFeedBack()
    })
    AppWrapper.update()
    expect(missionLoading).toBe(false);
    expect(missionInfoloading).toBe(false);
    expect(AppWrapper.text()).toBe("Loading    ");
    
  });

  // it('after loading data should be render',()=>{
    // mockMissionQuery.mockReturnValue({ loading:false, error:false, data:missionInfo});
    // mockLaunchQuery.mockReturnValue({loading:false, error:false, data:launchInfo});
    // mockMissionQuery(); mockLaunchQuery()
    // const AppWrapper: ReactWrapper = mount(<App />);
    // AppWrapper.update()
    // console.log(AppWrapper.text());
    // console.log(AppWrapper.text());
  // })

})
