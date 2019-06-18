## Answer to technical questions:

### How long did you spend on the coding test? 
5 hours
### What would you add to your solution if you had more time? 
1. Make the UI look better.
2. Make each row of the table clickable, and onClick, a modal with all the retaurant info would show up ( including a map that has your current position, and the position of the restaurant )
3. Add the ability to search by country/state
4. 


### What was the most useful feature that was added to the latest version of your chosen language?
Rest/Spread properties
Usage example:
To convert an Array of Arrays into one array:
```javascript
const arrayOfArrays = [[1,2,3],[4,5,6],[7,8,9]]

// without spread:
let singleArray = []
arrayOfArrays.forEach(insideArray => singleArray = singleArray.concat(insideArray))
console.log(singleArray) // expected output: [1, 2, 3, 4, 5, 6, 7, 8, 9]

// with spread:
console.log([].concat(...arrayOfArrays)) // expected output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### How would you track down a performance issue in production? Have you ever had to do this?
One way of tracking performance issues is to use a profiler and going through the recorded data to find the bottlenecks.
I have debugged performance issues on production before.


### How would you improve the API that you just used?
By adding extra helpful parameters to the JSON response. For example: `is_last_page`, `total_pages`.
Also, the API should support requesting all entries at once, instead of asking page by page.

### Please describe yourself using JSON.
Since this is a public repository, I did not fill in real data for personal fields
```json
{
  "full-name": "Armin Ghobadi",
  "first-name": "Armin",
  "last-name": "Ghobadi",
  "date-of-birth": "MM/DD/YYYY",
  "email": "emailAddress",
  "marital-status": "status",
  "phone-number": "+X-XXX-XXX-XXXX",
  "address": "#UnitNum - StreetNum StreetName - City - Province - Canada",
  "personal-info": {
    "height": "height",
    "race": "race",
    "religion": "religion",
    "eye-color": "eyeColor"
  },
  "education": {
    "post-secondary": {
      "institution-name": "UniversityName",
      "major": "Computer Science",
      "has-graduated": true,
      "degree": "Bachelor of Science",
      "date-of-graduation": "MM/DD/YYYY"
    },
    "highschool": {
      "institution-name": "HighSchoolName",
      "major": "major",
      "has-graduated": true,
      "degree": "degree",
      "date-of-graduation": "MM/DD/YYYY"
    },
  },
  "hobbies": ["volleyball", "soccer"],
  "profesional-experience": {
    "company-name-1": {
      "role": "role",
      "is-current-position": true,
      "start-date": "MM/YYYY",
      "end-date": null,
      "role-description": "description about what you have done during your time in the company, including technologies you used and projects you have done"
    },
    "company-name-2": {
      "role": "role",
      "is-current-position": false,
      "start-date": "MM/YYYY",
      "end-date": "MM/YYYY",
      "role-description": "description about what you have done during your time in the company, including technologies you used and projects you have done"
    }
  }

}
```