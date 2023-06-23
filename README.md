# Medikit
Medikit is an innovative online platform that simplifies the process of booking appointments with doctors and enables video calling for remote healthcare consultations. With the aim of enhancing accessibility and convenience in healthcare services, Medikit provides a user-friendly interface that connects patients with a wide range of medical professionals.

# Credential :
 ## Dcotor :

    Email:manojsfstm5@gamil.com
    Password: manoj

 ## Patient :

    Email:sanojkumar9110939228@gmail.com
    Password:mala
# Installation
 1. Clone the repository
 
        git clone https://github.com/manoj7654/doctor_patient_appointment_booking.git
2. Install the dependencies for using this command

       npm i instal

3. Create .env file for storing evironment variable.
 * mongoUrl: for connecting to our databas
 * key: for creating jwt token
 * secret_key: for creating refresh token
 * emailpassword: for sending confirmation mail regarding booking information
 
 4. Dependencies :
 * express: Web application framework for Node.js.
 * cors: Middleware for handling Cross-Origin Resource Sharing (CORS).
 * mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js.
* jsonwebtoken: Library for generating and verifying JSON Web Tokens (JWT).
* bcrypt: Library
nodemailer: To send Email notification

# Start the server
    npm run server

# Code Structure 
 For code structure i used mvc structure

 * index.js: In this file  sets up the Express.js server and establishes the database connection.

* config/db.js: It is used for making connection to our database.

* middlewares/authenticate.js: Defines the authentication middleware used to verify JWT tokens and authenticate users.

* middlewares/authorization.js: Defines the authorization middleware used to check user roles and restrict access to certain routes.

* models/bookingModal.js:It define the Mongoose schema and model for bookings.

* models/userModal.js: It defines the Mongoose schema and model for users (doctors and patients).

* routes/bookingRoute.js: It defines the Express.js router for booking-related endpoints.

* routes/userRoute.js: It defines the Express.js router for user-related endpoints.

# API Endpoints
 ## Register User
  * method : POST
  * Endpoint : users/register
  * Description: Registers a new user (doctor or patient) in the system.
  * Request Body:

            name (string): name of the user.
            email (string): Email address of the user.
            password (string): Password for the user's account.
            role (string): Role of the user (doctor or patient).
            specialty (string, required for doctors): Specialty of the doctor (if the user is a doctor).
            location (string, required for doctors/patient): Location of the user.

            example:
                   {
                  "name":"Manoj Kumar",
                  "email":"manojsfstm5@gmail.com",
                  "password":"manoj",
                  "gender":"male",
                  "role":"doctor",
                  "specialty":"dentist",
                  "location":"Sitamarhi"
                  }
   * Response :  If all the fields given correct then it will show in response user register successfully as doctor or patient

   ## User Login
    * method : POST
    * Endpoint : /users/login
    * Request Body:
      email (string): Email address of the user.
      password (string): Password for the user's account.

      example :
      {
      
      "email":"manojsfstm5@gmail.com",
      "password":"manoj"

      }
       
  * Response: If both email and password same then it will create jwt token for accessing resticted rout

## Retrieve Doctor
 * method : GET
 * Endpoint : /users/doctors
 * Response: It will return arr of response
        
        example :

                  [
            {
            "_id": "6493043eeaadad0e9dad57d3",
            "name": "Manoj Kumar",
            "email": "manojsfstm5@gmail.com",
            "password": "$2b$05$1jNYYia4D5jWLerWEDGzZO8qyT.P4/ybcKswv8zcpt1KlRtuic5G6",
            "role": "doctor",
            "gender": "male",
            "specialty": "dentalist",
            "location": "Sitamarhi"
            },
            {
            "_id": "649415a9d567725260dded98",
            "name": "chandan",
            "email": "ck@gmail.com",
            "password": "$2b$05$aGsCoeAHmOsv1ZSr2VdV/uW/auVG/aE4olSHOCy08yDlY.o6I2/8e",
            "role": "doctor",
            "gender": "male",
            "specialty": "Neurology",
            "location": "Delhi"
            }]

## Crete Booking
 * method:POST
 * Endpoint : bookings/create
 * Authorization: Bearer token (JWT token obtained from user login).
 * Request body :
            doctorId (string): ID of the doctor for the booking.

            bookingDate (string): Date of the appointment (format: "YYYY-MM-DD").

            bookingSlot(string): TimeSlot of the appointment
 * Response : It will return an object containing all the details

 ## Retrieve Booking Particular Users
 * method : GET
 * Endpoint : /bookings/singleUser
 * Authorization: Bearer token (JWT token obtained from user login).
 * Response : It will return arr of particular user

            example :
            {
            "msg": "All booking data of doctorId 6493043eeaadad0e9dad57d3",
            "Data": [
            {
                  "_id": "64952bb3fb8a80458d7ff5fb",
                  "userID": "64950e390427b10295ea3b8c",
                  "doctorId": "6493043eeaadad0e9dad57d3",
                  "email": "sanojkumar9110939228@gmail.com",
                  "bookingDate": "2023-06-25",
                  "bookingSlot": "12:00 PM to 01:00 PM",
                  "__v": 0
            },
            {
                  "_id": "6495432972867899b6e5294b",
                  "userID": "6495431472867899b6e52946",
                  "doctorId": "6493043eeaadad0e9dad57d3",
                  "email": "jishnurajkarockal2001@gmail.com",
                  "bookingDate": "2023-06-25",
                  "bookingSlot": "04:00 PM to 05:00 PM",
                  "__v": 0
            }
            ]
            }
## Delet Booking
 * method : DELETE
 * Endpoint : /bookings/delete/:ID
 * Authorization: Bearer token (JWT token obtained from user login).
 * Parameter : ID of the booking 
 * Response : If role is doctor then it will deleted other wise throw an error you are not authorized.


# Deployed Link
  ## Front-End : It is deployed on the netlify
     https://64954432c117a74821a3cbfb--euphonious-cat-a3b887.netlify.app/

 ## Back-End : It is deployed on the cyclic
      https://fair-pear-wildebeest-tutu.cyclic.app/
