import React from 'react';
import { mount, ReactWrapper, shallow } from 'enzyme';
import {act } from '@testing-library/react';
import Mission from '../components/Mission';
import {MissionList, util, missionNo }  from '../components/Mission/MissionList';
import ApolloClientProvider from '../GlobalProviders/ApolloClientProvider';
import { GlobalProvider} from '../GlobalProviders/GlobalProvider';
import { MissionsInfo as missionQuery } from '../components/Mission/query';
import { createMockClient, } from "@apollo/client/testing";

describe('Render App', () => {

    // beforeEach(()=>{
    // wrapper = mount(
    //         <ApolloClientProvider _client={mockClient}>
    //             <GlobalProvider>
    //                 <Mission />
    //             </GlobalProvider>
    //         </ApolloClientProvider>
    //     );
    // });
    const data = { launches: [{ flight_number: 1, "mission_name": "FalconSat", "launch_year": 2006 }, { flight_number: 2, "mission_name": "DemoSat", "launch_year": 2007 }] }
    const mockClient = createMockClient(data, missionQuery)

    it('mission container should have "loading" before when no data received and after receiving should have the query text', async() => {
        const wrapper = mount(
            <ApolloClientProvider _client={mockClient}>
                <GlobalProvider>
                    <Mission />
                </GlobalProvider>
            </ApolloClientProvider>
        );
        expect(wrapper.text()).toBe('Loading');

        await act(async()=>{
            await new Promise(resolve => setTimeout(resolve, 0));
        })
        wrapper.update();
        const missionContainer = wrapper.find('.missionContainer').children().children().children();
        
        expect(wrapper.text()).toBe('LaunchesFalconSat(2006)DemoSat(2007)');
        expect(missionContainer.at(0).matchesElement(<h2 className="launchListHeading" >Launches</h2>)).toBe(true);
        expect(missionContainer.at(1).html()).toBe('<div class="launchList"><ul><li class="selected"><div>FalconSat(2006)</div></li><li class=""><div>DemoSat(2007)</div></li></ul></div>');
    })

    it('when click on launches list item, SetMissionNo should be called',()=>{
        const MockSetMissionNo = jest.spyOn(util, "SetMissionNo" );
        const wrapper = mount(<GlobalProvider><MissionList data={data}/></GlobalProvider>);
        let launchesUL = wrapper.find('div.launchList').children()
        wrapper.update();
        expect(launchesUL.length).toBe(1);
        expect(launchesUL.children().length).toBe(2);
        expect(missionNo).toBe(1);
        expect(MockSetMissionNo).toBeCalledTimes(0);

        // console.log(launchesUL.children().at(1).debug());
        launchesUL.children().at(1).simulate('click');
        wrapper.update();
        expect(MockSetMissionNo).toBeCalledTimes(1);
        expect(missionNo).toBe(2);
        // console.log(launchesUL.children().at(1).debug());
    })

})