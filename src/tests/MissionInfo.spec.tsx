import React from 'react';
import { mount, shallow, ReactWrapper, ShallowWrapper } from 'enzyme';
import MissionInfo from '../components/Missioninfo';
import ApolloClientProvider from '../GlobalProviders/ApolloClientProvider';
import { GlobalProvider } from '../GlobalProviders/GlobalProvider';
import { LauncheMissionInfo as launchInfoQuery } from '../components/Missioninfo/query';
import { MissionsInfo as launchsQuery } from '../components/Mission/query';
import { createMockClient, } from "@apollo/client/testing";
import { LauncheMissionInfoQuery, MissionsInfoQuery } from '../generated/graphql';
import { act } from '@testing-library/react';

describe("Test MissionInfo container", () => {

    let wrapper: ReactWrapper;
    beforeEach(() => {
        wrapper = mount(
            <ApolloClientProvider _client={mockClient2}>
                <GlobalProvider>
                    <MissionInfo />
                </GlobalProvider>
            </ApolloClientProvider>
        );
    })

    // const launchs: LauncheMissionInfoQuery = { "launch": { mission_name: "FalconSat", flight_number: 1, launch_year: 2006, launch_success: false, details: "Engine failure at 33 seconds and loss of vehicle", launch_site: { "site_name": "Kwajalein Atoll", "__typename": "LaunchSite" }, "rocket": { "rocket_name": "Falcon 1", "rocket_type": "Merlin A", "__typename": "LaunchRocket" }, "links": { "flickr_images": [], "__typename": "LaunchLinks" }, "__typename": "Launch" } }
    const launchInfo: MissionsInfoQuery = { launches: [{ flight_number: 1, "mission_name": "FalconSat", "launch_year": 2006 }, { flight_number: 2, "mission_name": "DemoSat", "launch_year": 2007 }] }
    // const data = { "launch": launchs.launch, launches: launchInfo.launches }
    const variable = { "id": '1' }
    // const mockClient1 = createMockClient(launchs, launchsQuery)
    const mockClient2 = createMockClient(launchInfo, launchInfoQuery, variable)

    it("MissionInfo container should have 'loading' before when no data received", async () => {
        console.log(wrapper.text())
        expect(wrapper.text()).toBe("    ");
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        })
        wrapper.update();
        expect(wrapper.text()).toBe('    Error ');
        console.log(wrapper.text())
    })


})