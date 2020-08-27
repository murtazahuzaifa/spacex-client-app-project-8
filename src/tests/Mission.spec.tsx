import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import {act } from '@testing-library/react';
import Mission from '../components/Mission';
import ApolloClientProvider from '../GlobalProviders/ApolloClientProvider';
import { GlobalProvider } from '../GlobalProviders/GlobalProvider';
import { MissionsInfo as missionQuery } from '../components/Mission/query';
import { createMockClient, } from "@apollo/client/testing";

describe('Render App', () => {


    let wrapper:ReactWrapper;
    beforeEach(()=>{
    wrapper = mount(
            <ApolloClientProvider _client={mockClient}>
                <GlobalProvider>
                    <Mission />
                </GlobalProvider>
            </ApolloClientProvider>
        );
    });
    const data = { launches: [{ flight_number: 1, "mission_name": "FalconSat", "launch_year": 2006 }, { flight_number: 2, "mission_name": "DemoSat", "launch_year": 2007 }] }
    const mockClient = createMockClient(data, missionQuery)

    it('mission container should have "loading" before when no data received', async() => {
        expect(wrapper.text()).toBe('Loading');
        
        await act(async()=>{
            await new Promise(resolve => setTimeout(resolve, 0));
        })
        wrapper.update();
        expect(wrapper.text()).toBe('LaunchesFalconSat(2006)DemoSat(2007)');
    })

})