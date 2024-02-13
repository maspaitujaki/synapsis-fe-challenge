# Meidum
Meidum is created to complete Synapsis FE challenge

## Installation

### Requirements
- [NodeJS 18.17](https://nodejs.org/en) or later
- [Go Rest](https://gorest.co.in/) access token
  
Clone repository with git
```bash
git clone https://github.com/maspaitujaki/synapsis-fe-challenge.git
```
Install dependencies with npm or yarn
```bash
npm i
- or -
yarn install
```
Create a copy of .env.local.example to .env.local
```bash
cp .env.local.example .env.local
```
Change value of `NEXT_PUBLIC_GOREST_TOKEN` with your own token
```bash
NEXT_PUBLIC_GOREST_TOKEN=[YOUR_TOKEN]
```
Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
## Usage

### Blog Page
Features:
1. Browse blog posts (paginated)
2. Read blog content
3. Read blog's comments
![alt text](/readme-img/image-5.png)
![alt text](/readme-img/image-4.png)

### Users Page
Features:
1. List users
2. Search user
3. Filter user list
4. Create new user
5. Delete user
6. Edit user info
  
![alt text](/readme-img/image.png)
![alt text](/readme-img/image-1.png)
![alt text](/readme-img/image-2.png)
![alt text](/readme-img/image-3.png)