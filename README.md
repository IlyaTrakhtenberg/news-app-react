# NewsHive
App to explore up to date news worldwide
## Description
App generates API request from static adress and key and dynamic parameters adjusted to the API documentation and displays news articles from the response. 
There are two layout variations rendered corresponding to the display width. 
When opening app user is navigated to the /news route (subsequently also users home page can be added) and the entry 'top-headlines' is pushed into the url which is taken as :endpoint parameter.
Country of user is identified by side effect using the IP adress being set to US in case of error, category is initially set to 'general', both are managed by redux global state and pushed into url as search parameters.
Category can be changed using navigation links, country can be changed using selector in the search area.
Navigating to the 'All news' tab switches endpoint to 'everything' and search parameters are removed from url. User is asked to search for specific articles. Region selector is replaced with filters to manipulate search parameters such as 'sortBy','from' and 'language'.
Search parameter 'q' for key words is used in both endpoints. 
Articles are displayed as a list of titles, toggling each line expands it and displays also image, publication time, some aditional details and link to the resource.
Each article can be saved to read later and unsaved with corresponding button.
Navigating to 'Saved' tab changes layout to display the list of saved articles with buttons to remove each.
## Demo
API provider is free to use only in development. To make all the interface accessible in production demo I created sample response which is passed instead of real response in case of fetching error (which is obvious due to API usage terms).
Corresponding changes were moved to separate branch and deployed. The demo is available [here](https://news-hive.netlify.app) 


