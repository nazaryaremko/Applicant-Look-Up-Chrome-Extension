This chrome extension was developed during my summer internship at recruiting company Select. The goal was to automatize the process of looking up candidates in the internal database by clicking a button when visiting an applicant's profile in various Ukrainian job searching websites. After multiple attempts to achieve this I finally decides to scrape data from the profile, send a google sheet API request to fetch candidate's job ID which was linked to the workua id in the same google sheet. Then, using the workua ID, I created a link to the applicant's profile in the database. Based on whether the link was undefined or defined, I could tell whether the profile existed or not. 