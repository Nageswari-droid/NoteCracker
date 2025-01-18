<h1 align="center">
Note Cracker
</h1>

<div align="center">
<p align="center">
<video width="400" alt="login" src="https://github.com/user-attachments/assets/0604f9fc-96fc-464d-8396-88fbfe9408dd" style="text-align:center;" />
</p>
</div>


## Overview

Note Cracker is a `React JS` based application that leverages OpenAI and Supabase to support active recall of Notion notes through multiple-choice questions (MCQs). It uses OpenAI's GPT-4o-mini model to generate MCQs tailored to the selected Notion notes, offering users the flexibility to choose the number and difficulty level of questions. Supabase manages user authentication with Notion, allowing users to provide access to specific workspaces for revision. The application utilizes Edge Functions to seamlessly handle interactions with Notion and OpenAI APIs.

> The project is built with JavaScript for the front-end development and TypeScript (Deno) for the back end.

## Stack

- **React JS**: Front-end framework for building a responsive user interface.
- **Supabase Authentication**: Manages user authentication with Notion to access Notion pages.
- **Supabase Edge Functions**: Backend logic to interact with the Notion and OpenAI APIs.

## Setting up Supabase and Notion Integration

- Create a Supabase Project
- Enable Notion Login:
  - Follow the [documentation](https://supabase.com/docs/guides/auth/social-login/auth-notion?queryGroups=environment&environment=client&queryGroups=framework&framework=nextjs) to create a Notion integration.
  - Add your Supabase project URL as the redirect URI in the Notion integration settings.
- Configure Authentication:
  - In your Supabase project, navigate to the Authentication section from the menu.
  - Under the Providers tab, enable Notion as a provider.
  - Enter the OAuth Client ID and OAuth Client Secret from your Notion integration to complete the setup.
  - Enable Notion OAuth after entering all necessary credentials.  
  - Go to **Authentication** -> **Configuration** -> **URL Configuration**.  
  - Enter your **Site URL** and **Redirect URLs** to define where your website should redirect after authenticating with Notion.  
  - Under **Redirect URLs**, you can specify multiple URLs to account for local and production environments.  
  - Refer to [this guide](https://supabase.com/docs/guides/auth/redirect-urls) for further clarification.  

## Deploying Supabase Edge Function

- You can run the functions locally using Docker or deploy them directly to your Supabase account.

### Steps for Local Environment Setup
   - Get Docker from [here](https://docs.docker.com/get-started/get-docker/).
   - Follow the instructions to install the CLI from [this guide](https://supabase.com/docs/guides/local-development/cli/getting-started#updating-the-supabase-cli).
   - Verify that the Docker engine is running on your local machine.
   - Run the following commands to start the Supabase server and serve the functions:
     ```
     supabase start
     supabase functions serve
     ```
   - Make changes in the front-end to ensure API calls hit the local Edge Functions.  
   - Specifically, update the following files:
     - `/src/hooks/useListPages.js`
     - `/src/hooks/usePageContent.js`
   - In both files, update the following line:  
     ```
     const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || supabaseUrl;
     ```
   - Change it to:  
     ```
     const SUPABASE_URL = "http://127.0.0.1:54321";
     ```
   - Once the changes are made, the API calls from the front end will target the local Edge Functions.
     
### Steps for Deployment Setup
  - Navigate to the supabase directory from the root directory of the project.
  - Use the following commands to deploy the functions
    ```
    supabase login
    supabase functions deploy
    ```
  - There's no need to modify the code if you're deploying to a Supabase project.

## Local setup

- Clone the Repository
- Install the dependencies using `npm install`
- Generate an [OpenAI API key](https://platform.openai.com/account/api-keys)
- Create a .env file in the project’s root directory and include the following variables:
```
VITE_SUPABASE_URL = <supabase_url>
VITE_SUPABASE_KEY = <supabase_anon_key>
VITE_OPENAI_API_KEY = <openai_api_key>
```
- If the .env file is not created, the application will prompt input fields upon startup to enter all the necessary keys and URLs.
- This feature can be used if you prefer not to create environment variables manually.
- To start the application, `npm run dev`

## Application Walkthrough

- When the application starts, you can either use the configuration page (if the `.env` file is not available) or proceed directly to the login screen.
  <p align="center">
    <img width="400" alt="login" src="https://github.com/user-attachments/assets/2df5b627-f5b7-4590-ad2b-606d5737c836" />
  </p>
  
  <p align="center">
    <img width="400" alt="login" src="https://github.com/user-attachments/assets/800b818a-9fc7-4ec6-b445-87c5ec51321c" />
  </p>

- Click "Login to Notion" and select the workspace you want to grant access to.
  <p align="center">
    <img width="400" alt="login" src="https://github.com/user-attachments/assets/b7b9ebd2-7fff-4640-89df-f2d7777b7033" />
  </p>

- After logging in, you'll be redirected to a page where you can configure the workspace, pages, difficulty level, and the number of questions (minimum: 10, maximum: 20).
  <p align="center">
    <img width="400" alt="login" src="https://github.com/user-attachments/assets/bc2a89c5-4397-452a-9245-63ad5802c4ef" />
  </p>
  
- Click the "Submit" button to navigate to the MCQ revision page.  
- The selected number of questions will appear, each with four answer options.  
- Choose an answer and proceed to the next question.  
- Use the "Previous" button if you need to change any answers.
  <p align="center">
    <img width="400" alt="login" src="https://github.com/user-attachments/assets/de2f1c9a-a73e-42b3-898c-feb559461a46" />
  </p>

- Once all questions are answered, you'll see a result page displaying your score, correct answers, and explanations.  
- To revise again, click the "Revise More" button.
  <p align="center">
    <img width="400" alt="login" src="https://github.com/user-attachments/assets/bc581ccc-9d7c-459f-8ff2-48b828427fd5" />
  </p>

- If the selected Notion page contains only subpages and no actual content, you must select the subpages individually for revision.
- Attempting to select a page without any content will result in an error message instructing you to choose a page with content.
  <p align="center">
    <img width="400" alt="login" src="https://github.com/user-attachments/assets/da8735f8-ac37-44c6-a391-096a381ae6f2" />
  </p>

- If the selected note is unsuitable for generating MCQs (e.g., travel plans, personal information, timetables, shopping lists, etc.), an error message will prompt you to upload a valid note for revision.
  <p align="center">
    <img width="400" alt="login" src="https://github.com/user-attachments/assets/a73e58fd-4f15-4dbc-bbbf-07dc473a3fd6" />
  </p>

   <p align="center">
    <img width="400" alt="login" src="https://github.com/user-attachments/assets/ea6ac046-1180-4926-a3f7-912fe8e8b759" />
  </p>

- A "Logout" button is available on every page to end your session securely.  

