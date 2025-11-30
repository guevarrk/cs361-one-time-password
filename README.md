# One Time Password Microservice  

This microservice generates and verifies 6-digit OTP (One-Time Password) codes using the text-file communication pattern. It runs in its own process and communicates **only through a text file**.  

## Features  

### Generate OTP  

Send:  

generate  

Microservice **returns**:  

otp: **6-digit-code**  

### Verify OTP  
Send:  

verify: **code**  

Returns:  

verified: **true**  
or  
verified: **false**  

---  

## Communication File  

The service uses:  
**otp-service.txt**  

*This file must initially be empty.*  

---  

## Running the Microservice  

In Terminal 1:
```
node otp-service.js
```

You should see:

```[OTPService] Running... waiting for commands.```  


## Example Main Program  

In Terminal 2:  

``` node example-main-app.js```  

Example *output*:  

```
Requesting OTP...
Microservice Response: otp:392511
Verifying OTP...
Verification Result: verified: true  
```

---  

## Project Structure  

```
otp-authentication-microservice/
│
├── otp-service.js # Microservice Code
├── otp-service.txt # Communication Buffer
├── example-main-app.js # Example Demo
├── README.md
└── .gitignore
```

## Tech Stack  

- Node.js (Javascript)  
- Text File I/O
- *No* external dependencies


  ## Author

  Kristian Guevarra


