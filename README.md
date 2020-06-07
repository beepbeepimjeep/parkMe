# ParkMe

This GitHub repository includes the final submission of INFO30005 Web Information project. We aim to design a node JS project to help people find available parking spaces in the central area of Melbourne. 

Team Members are listed below (ordered by the alphabetical order):

- Wen Li Leong
- Yang Chen
- Yuhong Guo
- Ziheng Tang



### Description of Core Functionalities

- Authentication:

    - Sign up:

        Signup allows user to register for an account

    - Log in:
        Login allows user to login and the navigation bars will appear the user’s last name

    - Log out:

        Logout allows user to logout from their account

- Parking bays:

    - users can enter either current address or specific bayID to check the nearby parking bays
    - achieved by first pulling a JSON file from the Melbourne Platform and parse it to the MongoDB system.
    - for example, if the user chooses to search the nearby parking bays by typing the present address, our algorithm will geocode the input and sort it by distance.
    - secondary page will display the results from nearest to furthest. Including the detailed information about BayId, Status, Latitude, Longitude, link to the navigation shown on the map and the section for the later comments

- Parking lots:

    - This option is for people who prefer parking lots, as parking lots may seem to be safer for long-term parking.
    - firstly, add static information about parking lots in Melbourne CBD (sources from Google) and manually add them to MongoDB database.
    - similarly, geocode user input address and sort all the parking lots by distance(from nearest to furthest).
    - after that, a secondary page will pop out where contains a more informative table which includes the name of the parking lots, address and contact number.

- Navigation:

    



### URLs to access the functionalities on the front-end

- Home Page: http://parkme-info30005.herokuapp.com/

- Log in: http://parkme-info30005.herokuapp.com/user/login

- Sign up: http://parkme-info30005.herokuapp.com/user/signup

- Parking bays: 

    - search by present address (eg. 200 Victoria Street):
        http://parkme-info30005.herokuapp.com/parking/searchAddress?searchType=address&searchItem=200+Victoria+Street&addrInLat=30.305947&addrInLng=-89.360063
    - \- search by precise bayID (eg. 6520):
        http://parkme-info30005.herokuapp.com/parking/searchId?searchType=bayid&searchItem=6520&addrInLat=&addrInLng=

- Parking lots: 

    - search by specific address (eg. 200 Victoria Street): 

        http://parkme-info30005.herokuapp.com/parking/parkinglot?searchType=parkinglot&searchItem=200+Victoria+Street&addrInLat=45.636426&addrInLng=-64.051791

- Sample details of login:

    - email: john@mail.com
    - password: 12345
