# Car register
## Functional Requisites
- Should be possible register a car
- Should be possible list all categories
## Business Rule
- Should not be possible to register a car with an existing license plate
- Should not be possible to update an existing car license plate
- Should be possible to register a car with availability by default
- The user responsible for register should be administrator
# Car list
## Functional Requisites
- Should be possible to list all cars available
- Should be possible list all cars available by category name
- Should be possible list all cars available by brand name
- Should be possible list all cars available by car name
## Business Rule
- User does not need be logged on system
# Register of car's specification
## Functional Requisites
- Should be possible register an specification to a car
## Business Rule
- Should not be possible to register an specification to a non existing car
- Should not be possible to register an specification already existing to same car
# Register of images car
## Functional Requisites
- Should be possible register car images
## Non Functional Requisites
- Use multer to upload files
## Business Rule
- Should be possible register more than one image for same car by user
- The user responsible for register should be administrator
# Rent a car
## Functional Requisites
- Should be possible register a rent
## Business Rule
- The rent should be mininum duration of 24 hours
- Should not be possible register a new rent if already exists another one open for the same user
- Should not be possible register a new rent if already exists another one open for the same car
