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


## 