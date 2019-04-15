# backend

https://simpson-says.herokuapp.com/

'npm run server' to start

#Endpoints

| Endpoint   | Action                                                        | Accepts/Outputs  |
|------------|---------------------------------------------------------------|------------------|
| /register  | GET  -retrieves new username and password                     | string / string  |
| /login     | GET  -retrieves username and password                         | string / string  |
| /favorites | GET  -retrieves a list of existing favorite quotes            | array of strings |
               POST -adds new favorite quote to existing list                  string            
| /search    | GET  -retrieves user search string                            | string           |
| /generator | GET  -retrieves random quote from database based on character | string           |


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
    search: 'This is a search string.'  (not needed for BE because DS hooked up to FE)
}

GET to '/generator'

{
    genQuote: 'This is a randomly generated quote based on the chosen character.'
}