# backend

#Endpoints

User API has the following endpoints:

* GET to '/register' for retrieving new username and password

    -- accepts username (string) and password (string)

* GET to '/login" for retrieving username and password

    -- gets username (string) and password (string)

* GET to /favorites to get a list of existing favorites

    -- gets array of favorite quotes (strings)

* POST to /favorites to add new favorites to existing list

    -- outputs a favorite quote (string)

* GET to /search to retrieve user search string

    -- takes in user search words (string)

* POST to /generator to display new quote based on character to FE

    -- outputs a quote (string)