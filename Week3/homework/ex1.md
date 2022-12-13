1-What columns violate 1NF?

- "food_code" and "food_description" columns violet the NF1. Because each column should include just one value and one data type.

2-What entities do you recognize that could be extracted?

-It should be member|dinner|venue|food tables seperately.

3-Name all the tables and columns that would make a 3NF compliant solution.

-Member table : member_id PK, member_name, member_address
-Dinner table : dinner_id PK , dinner_date, venue_code FK, food_code FK
-Venue Table : venue_code PK, venue_description
-Food Table : food_code PK, food_description