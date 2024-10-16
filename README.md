![Home](https://github.com/carlwang1995/good-to-go/blob/main/public/readme/homePage.jpg)
# Good to GO
* [Introduction](https://github.com/carlwang1995/good-to-go/tree/main?tab=readme-ov-file#introduction)
* [Techniques](https://github.com/carlwang1995/good-to-go/tree/main?tab=readme-ov-file#techniques)
* [Features](https://github.com/carlwang1995/good-to-go/tree/main?tab=readme-ov-file#features)
* [Unit Test]()
* [Contact](https://github.com/carlwang1995/good-to-go/tree/main?tab=readme-ov-file#contact)
## Introduction
Good to GO is a travel itinerary planning website that allows users to create trips, search for places, and edit travel plans freely.

***Link：***[https://goodtogo-project.vercel.app/](https://goodtogo-project.vercel.app/)
* Test account : test@test.com
* Test password : 111111
* *Or you can just hit the "Login as Tester" button as well."*

![Login](https://github.com/carlwang1995/good-to-go/blob/main/public/readme/login.png)
## Techniques
### Front-End
* **Next.js**
  * App Router
* **React**
  * React Hooks：`useState`, `useReducer`, `useEffect`, `useContext`, `useRef`
  * Custom Hooks
    * useMapMarkers：`useContext`, `useReducer`
    * useUser：`useContext`, `useState`, `useEffect`
  * React Context
* **TypeScript**
* **Tailwind CSS**
### Back-End
* **Firebase**
  * Firestore Database
  * Storage
  * Authentication
### Third-Party
* **React Leaflet Map**
* **Google Map Platform APIs**
  * Places API
  * Place Photos API
  * Direction API
* **@hello-pangea/dnd** ( similar to `react-beautiful-dnd` )
* **react-date-range**
## Features
### Trip
* **Create a Trip**

![Create a Trip](https://github.com/carlwang1995/good-to-go/blob/main/public/readme/createTrip.gif)
* **Share the Trip**
  * Users can share a URL link with others and post it on the public trips page.

![Share the Trip](https://github.com/carlwang1995/good-to-go/blob/main/public/readme/setPrivacy.gif)
* **Upload Trip's Cover Photo**
  * Users can customize the trip covers by uploading photos.

![Upload Trip's Cover Photo](https://github.com/carlwang1995/good-to-go/blob/main/public/readme/uploadPhoto.gif)
### Plan
* **Add Places**

![Add Places](https://github.com/carlwang1995/good-to-go/blob/main/public/readme/addPlaces.gif)
* **Drag and Drop**
  * Developed draggable / droppable UI that allows users to freely edit the order of trips.

![DND](https://github.com/carlwang1995/good-to-go/blob/main/public/readme/DND%26Delete.gif)
* **Editing Interface**
  * Developed the interface that allows real-time editing, with data synchronized to the database without any noticeable delay.

![Setting Plan Detail](https://github.com/carlwang1995/good-to-go/blob/main/public/readme/SettingPlanDetail.gif)
![Setting Trip Info](https://github.com/carlwang1995/good-to-go/blob/main/public/readme/SettingTripInfo.gif)
## Component Structure
![Routing Tree](https://github.com/carlwang1995/good-to-go/blob/main/public/readme/structure/RoutingTree.jpg)
![Login](https://github.com/carlwang1995/good-to-go/blob/main/public/readme/structure/Login.jpg)
![Header](https://github.com/carlwang1995/good-to-go/blob/main/public/readme/structure/Header.jpg)
![Trips](https://github.com/carlwang1995/good-to-go/blob/main/public/readme/structure/Trips.jpg)
![Plans](https://github.com/carlwang1995/good-to-go/blob/main/public/readme/structure/Plans.jpg)
## Unit Test
* **Testing Button component layout and click event.**

![Unit Test](https://github.com/carlwang1995/good-to-go/blob/main/public/readme/UnitTest.jpg)
## Contact
* **Name:** Wei-Yao Wang
* **Email:** z5n9800z@gmail.com 
