import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// testing the ProjectService with some sample data
import { ProjectService } from './services/ProjectService'; 
import { projects } from './data/projects'; 
// const svc = new ProjectService(projects); 
// console.log('ProjectService count:', svc.count()); 
// console.log('ProjectService getAll:', svc.getAll());


// When you call a method on an instance, `this` refers to that instance.

const svc = new ProjectService(projects);
svc.filterByStatus('active');
// Inside filterByStatus, `this` === svc
// So `this.projects` === svc.projects

// You can create multiple instances, each with their own state:
const svc1 = new ProjectService(projects.slice(0, 3)); 
const svc2 = new ProjectService(projects.slice(3));

const svc3 = new ProjectService(projects); 
const fn = svc3.count; 
console.log(fn()); // This will fail or return NaN 

console.log(svc1.count()); // 3
console.log(svc2.count()); // 3
// svc1.projects and svc2.projects are completely separate arrays.
// `this` in svc1.count() refers to svc1.
// `this` in svc2.count() refers to svc2.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
