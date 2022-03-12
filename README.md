<div id="top"></div>

## Memeus
Memeus is Tinder but with memes - swipe, match, and chat with users based on their uploaded memes!

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#usage--features">Usage / Features</a>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

![Memeus login](https://user-images.githubusercontent.com/40411953/158020470-0f447df2-b6ec-49fe-bb32-e64ed38e50a1.png)

Memes are central in how we live today, even gaining prominence in popular culture, They are used as a tool not just for humour, but for social commentary and satire. 

The name Memeus comes from:
1. Memes + Us, showing a community aspect of memes bringing people together
2. Momus, the personification of satire and mockery in Greek mythology

On Memeus, you are judged based on the quality of your memes. Humour is used as a litmus test over appearances. We believe that humour forms the foundation of any good relationship, be it love or friendship.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage / Features
1. Starting from the landing page, log in or sign up for an account.

2. Upon logging in, you should be brought to the dashboard, where you can swipe on users. 

<div align="center"><img src="https://user-images.githubusercontent.com/40411953/158021450-ff522fd1-0f6a-4304-9b09-981d618b0fb8.png" /></div>

3. Click on the user icon on the left of the nav bar to go to the profile page where you can customise your profile and add your own personal touch.

<div align="center"><img src="https://user-images.githubusercontent.com/40411953/158021417-6a20290d-b086-4583-a891-d08f93460007.png" /></div>

4. Upon a successful match, an animation will pop up indicating a match.

<div align="center"><img src="https://user-images.githubusercontent.com/40411953/158021577-79961372-cf47-4e27-b0c3-de6f1b354592.png" /></div>

5. Click on the chats icon on the right of the nav bar to view your matches and chat with them.

<div align="center"><img src="https://user-images.githubusercontent.com/40411953/158021699-173d4483-0274-4782-ac2a-d762c540a123.png" /></div>


<p align="right">(<a href="#top">back to top</a>)</p>

## Built With

<strong>Frontend</strong>
* [React.js](https://reactjs.org/)
* [Framer Motion](https://www.framer.com/motion/)
* [Tailwind CSS](https://tailwindcss.com/)

<strong>Backend</strong>
* [Express](https://expressjs.com/)
* [Sequelize](https://sequelize.org/v7/)
* [PostgreSQL](https://www.postgresql.org/)

<strong>Realtime chat</strong>
* [Socket.io](https://socket.io/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
* PostgreSQL

### To run

1. Clone the repo
2. Install NPM packages
   ```sh
   npm i
   ```
3. Init db with sequelize
   ```sh
   npx sequelize db:create && npx sequelize db:migrate && npx sequelize db:seed:all
   ```
4. Run app
   ```sh
   npm run watch
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Jia Hao: [GitHub](https://github.com/lim-jiahao/) - lim.jiahaoo@gmail.com

David: [GitHub](https://github.com/daves77) - davidlimjh77@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
