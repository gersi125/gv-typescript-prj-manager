// Project Input Class
import { Component }             from './base-component';
import { Validatable, validate } from '../util/validation';
import { AutoBind }              from '../decorators/autobind';
import { projectState }          from '../state/project-state';

export class ProjectInput extends Component<HTMLDivElement, HTMLElement>{
       
    titleInputElement: HTMLInputElement;
    descInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
        
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title');
        this.descInputElement = <HTMLInputElement>this.element.querySelector('#description');
        this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people');
        this.configure();
    }
    
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    
    renderContent() {}
    
    private gatherUserInput(): [string, string, number] | undefined {
        const enteredTitle = this.titleInputElement.value; 
        const enteredDescription = this.descInputElement.value; 
        const enteredPeople = this.peopleInputElement.value; 
    
        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 15
        };
        const peopleValidatable: Validatable = {
            value: enteredPeople,
            required: true,
            min: 10
        };
    
    
        if(!validate(titleValidatable) || !validate(descValidatable) || !validate(peopleValidatable)) {
            alert('Invalid Input! ');
            return;
            } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    
    }
    
    private clearInput() {
        this.titleInputElement.value = '';
        this.descInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    
    @AutoBind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if(Array.isArray(userInput)) {
            const[title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInput();
        }
    }
}
