import React from 'react';
import AdditionalSection from '../AdditionalSection/AdditionalSection';
import Banner from '../Banner/Banner';
import Login from '../Login/Login';
import Menubar from '../Menubar/Menubar';
import ShowReview from '../ShowReview/ShowReview';
import Watches from '../Watches/Watches';

const Home = () => {
    return (
        <div>
            <Menubar></Menubar>
            <Banner></Banner>
            <AdditionalSection></AdditionalSection>
            <Watches></Watches>
            <ShowReview></ShowReview>
        </div>
    );
};

export default Home;