Feature: Update store team information
    In order to have the option to update the team information of the store in the platform
    As a authenticated user with a created store
    I want to update my team information

    Scenario: A authenticated user without a created store
        Given I get an access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZDY0MjAyNDEtZDg5NC00YmM2LWJlNWUtZGFjMmE0YzQwNzM3Iiwic2Vzc2lvbiI6ImU3YzJmZWNmLWU0OWItNDE0MS1iMjZjLThkYzFjZGFjMjgxNSIsImlhdCI6MTY2NTcxNzA0OH0.M_qiNCV5yK4n8-SKjxWd6KR28dHjBpdnn83kuEHhXQc"
        Then I send an authenticated PUT request to "/store/team" with body:
        """
        {
            "img": "https://blog.ida.cl/wp-content/uploads/sites/5/2020/04/tamano-redes-blog-655x470.png",
            "description": "This is a test description",
            "video_link": "https://www.youtube.com/watch?v=Z2pt_qU6v74"
        }
        """
        And the response status code should be 404
        And the response should have an error message
        

    Scenario: A authenticated user with a created store
        Given I get an access token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZDY0MjAyNDEtZDg5NC00YmM2LWJlNWUtZGFjMmE0YzQwNzM3Iiwic2Vzc2lvbiI6ImU3YzJmZWNmLWU0OWItNDE0MS1iMjZjLThkYzFjZGFjMjgxNSIsImlhdCI6MTY2NTcxNzA0OH0.M_qiNCV5yK4n8-SKjxWd6KR28dHjBpdnn83kuEHhXQc"
        Then I send an authenticated POST request to "/store/create" with body:
        """
        {
            "domain": "thisisadomain",
            "name": "New Store",
            "whatsapp": "51967587667",
            "type": "Pantalones y Joggers",
            "country_id": "7728c85e-ac59-4954-8e70-0311942bca12",
            "currency_id": "0d204bc1-ae8f-4c40-a523-0db4dc3a59bd"
        }
        """
        And I send an authenticated PUT request to "/store/team" with body:
        """
        {
            "img": "https://blog.ida.cl/wp-content/uploads/sites/5/2020/04/tamano-redes-blog-655x470.png",
            "description": "This is a test description",
            "video_link": "https://www.youtube.com/watch?v=Z2pt_qU6v74"
        }
        """
        And the response status code should be 200
        And the response should be empty
    
    