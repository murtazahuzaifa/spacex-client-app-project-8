import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import App, { missionLoading, missionInfoloading, missionFeedBack, missionInfoFeedBack } from '../App';
import LogoLoading from '../components/LogoLoading';
import Mission from '../components/Mission';
import MissionInfo from '../components/Missioninfo';
import { act } from 'react-dom/test-utils';
import ApolloClientProvider from '../GlobalProviders/ApolloClientProvider';
import {GlobalProvider} from '../GlobalProviders/GlobalProvider';

describe('Render App', () => {
 
  // let AppWrapper:any;
  // beforeEach(()=>{
  // AppWrapper = mount(<App/>);
  // });

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

})
