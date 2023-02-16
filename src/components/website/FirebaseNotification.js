import React from 'react';
import './Styles/AboutBanner.scss';
import HomePageFooter from './HomePageFooter';
// import circled from "../../assets/circled-check.svg"
// import fbgreen from "../../assets/fbgreen.svg"
// import iggreen from "../../assets/iggreen.svg"
// import twgreen from "../../assets/twgreen.svg"
// import ligreen from "../../assets/ligreen.svg"
import { Top } from './top/top';
import { Singleteam } from './singleteam/singleteam';
import ayo from '../../assets/ayo.png';
import wale from '../../assets/wale.jpg';
import yemi from '../../assets/yemi.jpg';
import sa from '../../assets/sa.jpg';
import ba from '../../assets/ba.jpg';
import nick from '../../assets/nick.jpg';
import maisha from '../../assets/maisha.png';
import laura from '../../assets/laura-spiekerman.jpg';
function AboutBanner() {
  return (
    <div className="about-bannner-container">
      <Top
        title="“ NetWebPay willbecome the Bank of
                the Future for Immigrants. ”"
        body="Founded by two Brothers who self-migrated to the U.S,
                Olu and Abimbola, an AI engineer and a Immigration attorney,
                vesti provides unique guidance and financial services for people"
      />
      <div className="container team-bottom-content">
        <section className="other-team-members">
          <div className=" mt-5 pt-5 pb-5 team-header">
            <p>Meet The Team Members</p>
            <p className="text-center">
              The UN office on the Immigration values this industry at
              650billion with <br /> 272million people moving abroad in 2019.
              vesti intends to be the bridge <br /> for Immigrants and the first
              bank a migrant opens when they move to a new country.
            </p>
          </div>

          <div className="container other-team-members-content">
            {/* <div className="row row-cols-1 row-cols-md-3 g-4 team-row"> */}
            <div className="g-4 team-row">
              <Singleteam
                name="Olu Amusan"
                department="Co-Founder/CEO"
                image={sa}
              />
              <Singleteam
                name="Bimbo Amusan"
                department="Co-Founder/COO"
                image={ba}
              />
              <Singleteam
                name="Ayomiposi Adewale "
                department="Product Lead Engineer"
                image={ayo}
              />
              <Singleteam
                name="Michael Yemi"
                department="Lead Backend Developer"
                image={yemi}
              />

              <Singleteam
                name="Adewale Adeosun"
                department="Mobile Developer"
                image={wale}
              />

              <Singleteam
                name="Nicholas Bassey"
                department="Frontend Engineer"
                image={nick}
                linlink="www.linkedin.com/in/nicholas-bassey-639046b9"
              />

              {/* <Singleteam
                                name="Ajibola Ojo"
                                department="Frontend Engineer"
                                image={placeholder}
                            /> */}
            </div>

            <div className="g-4 team-row mt-5 pb-5">
              <p className="advisors">ADVISORS</p>
            </div>
            <div className="g-4 team-row">
              <Singleteam
                name="Maisha Burt"
                department="Advisor"
                image={maisha}
              />
              <Singleteam
                name="Laura Spiekerman"
                department="Advisor"
                image={laura}
              />
            </div>
          </div>
        </section>
      </div>
      <HomePageFooter />
    </div>
  );
}

export default AboutBanner;

// npm install firebase
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC__O1ZFmpFf2eTkdPImgFAVsRexX9-pSc",
//   authDomain: "netwebpay-michael.firebaseapp.com",
//   projectId: "netwebpay-michael",
//   storageBucket: "netwebpay-michael.appspot.com",
//   messagingSenderId: "657118311862",
//   appId: "1:657118311862:web:7e975c660038195fc73d17",
//   measurementId: "G-N9X66VDR7S"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// import React, { useState, useEffect } from "react";
// import firebase from "firebase/app";
// import "firebase/firestore";

// const App = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // Initialize Firebase
//     const firebaseConfig = {
//       apiKey: "your-api-key",
//       authDomain: "your-auth-domain",
//       databaseURL: "your-database-url",
//       projectId: "your-project-id",
//       storageBucket: "your-storage-bucket",
//       messagingSenderId: "your-sender-id",
//       appId: "your-app-id"
//     };
//     firebase.initializeApp(firebaseConfig);

//     // Get a reference to the Firestore collection
//     const db = firebase.firestore();
//     const collection = db.collection("notifications");

//     // Read data from Firestore and update the React state
//     collection.onSnapshot(snapshot => {
//       const notifications = [];
//       snapshot.forEach(doc => {
//         notifications.push(doc.data());
//       });
//       setNotifications(notifications);
//     });
//   }, []);

//   return (
//     <div>
//       <h1>Notifications</h1>
//       <ul>
//         {notifications.map(notification => (
//           <li key={notification.id}>{notification.message}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;
