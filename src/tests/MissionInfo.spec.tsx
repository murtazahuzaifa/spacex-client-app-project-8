import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import NavBar from '../components/NavBar';
import MissionInfo from '../components/Missioninfo';
import ApolloClientProvider from '../GlobalProviders/ApolloClientProvider';
import { GlobalProvider } from '../GlobalProviders/GlobalProvider';
import { LauncheMissionInfo as launchInfoQuery } from '../components/Missioninfo/query';
import { createMockClient, } from "@apollo/client/testing";
import { LauncheMissionInfoQuery } from '../generated/graphql';
import { act } from '@testing-library/react';

describe("Test MissionInfo container", () => {

    let wrapper: ReactWrapper;
    beforeEach(() => {
        wrapper = mount(
            <ApolloClientProvider _client={mockClient}>
                <GlobalProvider>
                    <MissionInfo />
                </GlobalProvider>
            </ApolloClientProvider>
        );
    })

    const launchInfo: LauncheMissionInfoQuery = { "launch": { mission_name: "FalconSat", flight_number: 1, launch_year: 2006, launch_success: false, details: "Engine failure at 33 seconds and loss of vehicle", launch_site: { "site_name": "Kwajalein Atoll", "__typename": "LaunchSite" }, "rocket": { "rocket_name": "Falcon 1", "rocket_type": "Merlin A", "__typename": "LaunchRocket" }, "links": { "flickr_images": [], "__typename": "LaunchLinks" }, "__typename": "Launch" } }
    const variable = { id: '1' }
    const mockClient = createMockClient(launchInfo, launchInfoQuery, variable)

    it("MissionInfo container should have 'loading' before when no data received and after receiving should have the query text", async () => {
        expect(wrapper.text()).toBe("    "); //before fetching;
        expect(wrapper.find(NavBar).exists()).toBe(true);

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        })

        wrapper.update();
        expect(wrapper.text()).toBe(" Mission: FalconSatLaunch year: 2006Flight-1: FailedRocket: Falcon 1 (Merlin A) Details: Engine failure at 33 seconds and loss of vehicle ");
        const missionInfoWrapper = wrapper.children().children().children().children().children()
        const missionInfoContainer = missionInfoWrapper.find({className:"missionInfoContainer"})
        // const missionNameHeading = missionInfoContainer.find({'data-testid':"mission-name"});
        
        expect(missionInfoWrapper.find(NavBar).exists()).toBe(true);
        expect(missionInfoContainer.children().at(0).matchesElement(<br/>)).toEqual(true);
        expect(missionInfoContainer.children().at(1).matchesElement(<h1>Mission: FalconSat</h1>)).toEqual(true)
        expect(missionInfoContainer.children().at(2).matchesElement(<br/>)).toEqual(true);
        expect(missionInfoContainer.children().at(3).matchesElement(<div><b>Launch year:</b>2006</div>)).toEqual(true);
        expect(missionInfoContainer.children().at(4).html()).toBe('<div><b>Flight-1:</b> <span style="color: red;">Failed</span></div>');
        expect(missionInfoContainer.children().at(5).matchesElement(<div><b>Rocket:</b> Falcon 1 <i>(Merlin A)</i></div>)).toEqual(true);
        expect(missionInfoContainer.children().at(6).matchesElement(<br/>)).toEqual(true);
        expect(missionInfoContainer.children().at(7).matchesElement( <div className="missionDetails"> <h3>Details:</h3> <p>Engine failure at 33 seconds and loss of vehicle</p> </div> )).toEqual(true);
        expect(missionInfoContainer.children().at(8).html()).toBe('<div class="imageDiv"><img src="https://i.ytimg.com/vi/TKKa4TaRm6c/maxresdefault.jpg" alt="rocket"></div>');
    })


})