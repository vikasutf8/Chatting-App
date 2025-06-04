# Updated Progress : Scalable chat Application on integrate Kafka and Redis 

## Client 

- NextJs with Shadcn UI/ Tailwind CSS
- NextAuth : Should be google, Github ...more or
  -  Google Developer Console setup
    - Create new Project and select that >> it will takes little time
    - Menu option << API & Services << Oauth consent screen << Client << create Button
    - On filling all required field ,moved on Client as entry URL `http:"' localhost:8000` and callback url `http://localhost:3000/api/auth/callback/google` and save
    - COPY clientID and clientSecret , using them at env
    - 
      `GOOGLE_CLIENT_ID= \\
      GOOGLE_CLIENT_SECRET= \\
      NEXTAUTH_URL=http://localhost:8000 \\
      NEXTAUTH_SECRET=`
- Component
  - base : basic template of pages

## Server 

- NodeJs Server on Express
- Prisma : Postgres via NEON/Supabase::also integre later with mongodb for structureless schema
- Supabase : create new project with prisma ORM `npx prisma init` and create schema them migrate `npx prisma migrate dev --name=users_table
