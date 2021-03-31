// Drag and Drop Interfaces
// You can put anything within a namespace    
export interface Drag { 
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}
   
export interface DragTarget { 
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

