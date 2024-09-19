# Good to GO
🌏 Good to GO is a travel itinerary planning website that allows users to create trips, search for places, and edit travel plans freely.     
🔗 [Website Link](https://goodtogo-project.vercel.app/)
* Test account : test@test.com
* Test password : 111111
## Main Features
* Authenticate with Google login, and users' email addresses and passwords.
* Developed draggable / droppable UI that allows users to freely edit the order of trips.
* Developed the interface that allows real-time editing, with data synchronized to the database without any noticeable delay.
* Users can customize the trip covers by uploading photos.
* Users can share a URL link with others and post it on the public trips page.
* Responsive web design.
## Core Techniques and Tools
### Front-End
* **Framework:** Next.js, React Hook (`useState`, `useEffect`, `useContext`, `useRef`)
* **Global State Management:** React Context API
* **Router Management:** Next.js APP Router
* **Styling:** Tailwind CSS
* **Code Formatter:** Prettier
### Back-End
* Firebase Firestore Database
* Firebase Storage
* Firebase Authentication
### Third Party Library
* React Leaflet Map
* Google Map Platform APIs
  * Places API
  * Place Photos API
  * Direction API
* @hello-pangea/dnd ( similar to `react-beautiful-dnd` )
* react-date-range
