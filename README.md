# Kutty's ArtBot

Kutty's ArtBot is an unofficial front-end web client designed for interacting with the Stable Horde distributed cluster—a group of GPUs running Stable Diffusion whose processing time has been kindly donated by an enthusiastic community of volunteers.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- Text-to-Image Generation using Stable Diffusion
- Secure and private storage of AI-generated images using IndexedDB and LocalStorage APIs
- Custom-built UI components with Tailwind CSS
- Integration with the Stable Horde distributed cluster
- Icons from Tabler

## Technologies Used

- [Next.js 13](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Tailwind CSS](https://tailwindcss.com/)
- [Styled Components](https://styled-components.com/) (with plans for removal)
- [Tabler Icons](https://tabler-icons.io/)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Kuttykishorekk/Kutty-s-Artbot.git
    ```

2. Navigate to the project directory:

    ```sh
    cd kuttys-artbot
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

4. Create a `.env.local` file to configure environment variables as needed.

## Usage

1. Start the development server:

    ```sh
    npm run dev
    ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:

    ```sh
    git checkout -b feature/your-feature-name
    ```

3. Make your changes and commit them:

    ```sh
    git commit -m "Add your feature"
    ```

4. Push to the branch:

    ```sh
    git push origin feature/your-feature-name
    ```

5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- The enthusiastic community of volunteers who have donated their GPU processing time.
- The developers and contributors of [Stable Diffusion](https://github.com/CompVis/stable-diffusion).
- [Tabler Icons](https://tabler-icons.io/) for providing beautiful icons.

---

Happy generating! 🎨🚀
