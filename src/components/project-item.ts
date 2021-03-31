// Project Item Class
import { Component } from './base-component';
import { Drag }      from '../models/drag-drop';
import { AutoBind }  from '../decorators/autobind';
import { Project }   from '../models/project';

export class ProjectItem extends Component<HTMLUListElement, HTMLElement> implements Drag {
    private project: Project;
    
    get persons() {
        if(this.project.people === 1) {
            return '1 person';
        } else {
            return `${this.project.people} persons`;
        }
    }
    
    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
   
        this.configure();
        this.renderContent();
    }
    
    @AutoBind
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    };
    
    @AutoBind
    dragEndHandler(event: DragEvent) {
        console.log(event);
    };
    
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);  
    };
    
    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.desc;
    };
}
    