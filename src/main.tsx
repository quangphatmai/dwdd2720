import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// import the generic function demo before we render the app
import { demoIdentity, demoFindById, demoUpdateById } from "./utils/generics";



// testing the ProjectService with some sample data
import { ProjectService } from './services'; 
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
console.log(svc3.count()); 

console.log(svc1.count()); // 3
console.log(svc2.count()); // 3
// svc1.projects and svc2.projects are completely separate arrays.
// `this` in svc1.count() refers to svc1.
// `this` in svc2.count() refers to svc2.

/* const serviceTest4 = new ProjectService(projects);
serviceTest4.projects.push({ id: 'hacked', name: 'Rogue Project',
  status: 'active', clientName: 'Nobody' });

  console.log(serviceTest4.projects.find(p => p.id === 'hacked')); */
  
// This is a problem! We can mutate the internal state of the service from outside.
// We'll fix this in Topic 4 by making the projects property private.


// just a quick test of the generics function before we render the app
demoIdentity();
demoFindById();
demoUpdateById();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
