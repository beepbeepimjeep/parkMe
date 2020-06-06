ParkMe Info30005 A node js project aiming to help people find on street car parks, the data we are using is from https://data.melbourne.vic.gov.au/

Authors Guo Yuhong Wen Li Leong Yang Cheng Ziheng Tang

Function 1: Search nearby carpark by entering a address route: /parking/searchAddress Steps: 1. Select address radio above the search bar 2. Enter address in the form of [street num, street name, city, country] 3. Possible input {300 Lonsdale Street, Melbourne, AUS} 4. Return results order by closest to furthest

Function 2: Search detail of a car park by entering the bayid route: /parking/searchId Steps: 1. Select bayId radio above the search bar 2. Enter the bayid you wish to search 3. Possible input : {1,2,3,4,5} 4. Result of that parking bay will return

Function 3: Comment a particular parking bay router: /parking/add Steps: 1. Click Get_All_Parking link 2. Will return all parking data 3. Click the comment button behind any of the result, a modal will pop up 4. Enter your comment, the page will redirect back to getAllParking and your comment will display there
