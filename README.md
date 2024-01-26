<h1 align="center"> Weather App </h1>
<p align="center">
 <a href="#description">Description</a> •
 <a href="#demonstration">Demonstration</a> •
  <a href="#requirements">Requirements</a> •
 <a href="#tecnologies">Tecnologies</a>
</p>

### Description

Developed an application for displaying weather data for a specific city. It allows users to view information such as temperature, humidity, wind speed, and weather description. Users can search for a specific city available in the database of the Weather API used, which is Weather API (https://www.weatherapi.com/my/), chosen for ease of request, an integrated city search API, and the number of free requests in the version provided.

As extra features, when the user enters the application with location tracking enabled, the application retrieves information not only for the current day but also the temperature forecast for the next 5 days based on the user's current location. Additionally, users can switch between Celsius and Fahrenheit temperature scales through a switch at the top of the application.Dockerfile and docker-compose files have been set up to run the project without the need to install the utilized technologies. A style-based feature has also been built, the application changes the background according to the local time of the searched city.

### Demonstration

The project can be accessed without the need to run it locally. I deployed using the [Vercel](https://vercel.com/) platform.

Access link: [https://weather-9hwfammfk-elvisserafim.vercel.app/](https://weather-gdxf1m89r-elvisserafim.vercel.app/)



https://github.com/ElvisSerafim/Weather-App/assets/38743740/24edbbee-6baa-4289-9011-319c8add4f76



### Requirements

Before you begin, you'll need to have the following tools installed on your machine:
[Git](https://git-scm.com) and [Docker](https://www.docker.com/).

### 🎲 Runnning the Project

```bash
# Clone the repository
$ git clone <https://github.com/ElvisSerafim/Weather-App.git>

# Access the project folder
$ cd weather-app

# Add the .env file on the root of the project. Link to env file: https://drive.google.com/file/d/1gidI5vKmzJoAjlSPkp8zbvalXHWRUVn-/view?usp=sharing

# Execute docker-compose
$ docker-compose up

# The project will run on 3000 port. Open the browser and visit this URL
$ http://localhost:3000
```

## Tecnologies

The following tecnologies were used in the construction of the project:

- [Nextjs](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
- [Tailwind](https://tailwindcss.com/)
- [NextUI](https://nextui.org/)
- [Axios](https://axios-http.com/)

## Observations
If you see this error in the console, ![image](https://github.com/ElvisSerafim/Weather-App/assets/38743740/c0e6dc28-2bcb-4b50-ae84-41c263a89c30)
it is an issue with NextUI. There is a merge request awaiting approval to address this problem. There is a workaround mentioned at https://github.com/nextui-org/nextui/issues/2074; however, this workaround introduces a typing error that subsequently impacts the project build process. Consequently, I chose not to add it to the project
