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

## Deploying Supabase Edge Function

- You can run the functions locally using Docker or deploy them directly to your Supabase account.
- Steps for Deployment:
  - Navigate to the supabase directory from the root directory of the project.
  - Use the following commands to deploy the functions

    ```
    supabase login
    supabase functions deploy
    ```
- Ensure the Supabase container is running in Docker to execute the deployment successfully.

## Local setup

- Clone the Repository
- Install the dependencies using `npm install`
- Generate an [OpenAI API key](https://platform.openai.com/account/api-keys)
- Create a .env file in the project’s root directory and include the following variables:
```
VITE_SUPABASE_URL = <supabase_url>
VITE_SUPABASE_KEY = <supabase_anon_key>
VITE_OPENAI_API_KEY = <openai_api_key>
VITE_SUPABASE_BASE_URL = http://127.0.0.1:54321/functions/v1 (or) <VITE_SUPABASE_URL>/functions/v1
```
- To start the application, `npm run dev`



