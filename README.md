# backend

https://simpson-says.herokuapp.com/

npm run server to start

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





GET to '/register'

{
    userName: 'string',
    password: 'string'
}

GET to '/login'

{
    userName: 'string',
    password: 'string
}

GET to '/favorites'

favoriteQuotes = [
    {
        id: 1,
        quote: 'This is a quote.'
        char: 'Character Name'
    }
    {
        id: 2,
        quote: 'This is a quote.'
        char: 'Character Name'
    }
];

POST to '/favorites'

favoriteQuotes = [
    {
        id: 8,
        quote: 'This is a quote.',
        char: 'Character Name'
    }
];

GET to '/search'

{
    search: 'This is a search string.'
}

GET to '/generator'

{
    genQuote: 'This is a randomly generated quote based on the chosen character.'
}