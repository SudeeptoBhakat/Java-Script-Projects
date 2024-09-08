export default class Task{
    constructor (heading, status=false){
        this.heading = heading
        this.status = status
    }
    taskComplete(){
        this.status = !this.status
    }
    getTaskHtml(index) {
        return `
            <div class="task">
                <div class="task-left">
                    <input type="checkbox" id="task-heading-${index}" class="custom-checkbox" ${this.status ? 'checked' : ''}>
                    <label for="task-heading-${index}" class="task-text"><strong>${this.heading}</strong></label>
                </div>
                <div class="task-right">
                    <i class="fa-solid fa-ellipsis-vertical menu-icon"></i>
                    <div class="task-actions">
                        <button class="delete-btn">Want to Delete this Task</button>
                    </div>
                </div>
            </div>
        `;    
    }
}