# PH-TOUR-MANAGEMENT-FRONTEND-1

GitHub Link: https://github.com/Apollo-Level2-Web-Dev/ph-tour-management-system-frontend

## 35-1 Project Overview and Objectives
### Tech Stack 

- React
- React Router 
- Redux -> Rtk Query 
- Typescript
- Shadcn 
- origin ui

## 35-2 Exploring Project Structures: Monorepo vs Polyrepo, Monolith vs Microservices

### Project Organization 
- **Mono Repo** : Frontend + Backend same Repository. Here Mostly Docker is used to maintain single deploy. 
- **Poly Repo** : Backend Frontend Different Repository. Poly repo is easy to maintain we have take care of cors issue  as deployed separately. 


#### In Our Project We will use Poly Repo. 


### Architecture 
- **Micro Service** : Each and Every service will be separated in a project and sending them to frontend by connection. Multiple codebase, Multiple database Multiple deployment then communication system need with each of then and then centralize them in one and send it to frontend. 
- **Monolith** : Single codebase, single database single deployment(FRONTEND + BACKEND If we connect using CI/CD Pipeline And Docker)

#### What is CI/CD Pipeline
- We will push the code in git then the pipeline will push the code in repo after checking the code and will automatically trigger the deployment. 


## 35-3 Selecting the Right Tech Stack for the Project
- We have Done Backend Using Modular Pattern

### What we will do in frontend?
- There is no specific pattern for frontend. We will change time  by time. We will just maintain a structure

### There are some Major works in frontend
- How do we handle Auth (social, google, custom, email pass) in backend we have used passport.js. WE can explore `betterauth` for another system of frontend. Auth can be `Session Base` or `Token Based`. In our bakend we have use token based.
- How Do we handle the State (depends on ecosystem)
    1. Local State (for react - Redux, zustand)
    2. Remote State (Data Fetching in react - tanstack, RTK Query)
- How do we handle The View
    1. Raw Css
    2. Use Frameworks



#### `React Aria` `MUI Base` these are some headless. we can pick and make our own design but the user iteration will be done by headless


## 35-4 Backend Setup and Configuration
- Clone THe REquired Branch Of The Backend

```
git clone https://github.com/Sazid60/PH-TOUR-MANAGEMENT-BACKEND.git --branch Bac-8
```
- Install The package Lock 

```
npm i 
```
- It is Recommended To Use Only One package Log THat has been used iN this project like `npm`, `bun` 

- add the env 

- Run The Project. WE can use any run time like `bun`, `npm` 